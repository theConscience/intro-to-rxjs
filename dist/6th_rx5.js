console.log('6th_rx5.js is loading...')

const Rx = window['Rx']
console.log('Rx is:', Rx)

const refreshBtn = document.querySelector('.refresh-btn')
const suggestionsList = document.querySelector('.suggestions-list') 
const closeBtn1 = suggestionsList.querySelector('.suggestions-list__suggestion--1 .media-card__button--close')
const closeBtn2 = suggestionsList.querySelector('.suggestions-list__suggestion--2 .media-card__button--close')
const closeBtn3 = suggestionsList.querySelector('.suggestions-list__suggestion--3 .media-card__button--close')

// create Stream, for refresh button click events:
const refreshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click')
const closeClickStream1 = Rx.Observable.fromEvent(closeBtn1, 'click')
const closeClickStream2 = Rx.Observable.fromEvent(closeBtn2, 'click')
const closeClickStream3 = Rx.Observable.fromEvent(closeBtn3, 'click')

// map clicks to url stream and adds initial value for startup:
const requestStream = refreshClickStream.startWith('startup click')
    .map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`) // returns new stream

// use 3rd tryish style from 4th example...
const responseStream = requestStream
    .flatMap(url => Rx.Observable.fromPromise(fetch(url).then(response => response.json())))
    .publishReplay().refCount(1)  // adds cashing, now all responseStream.subscribers uses same xhr request 

// responseStream.subscribe(jsonData => console.log('response json data:', jsonData))

const suggestionStream1 = createSuggestionStream(responseStream, closeClickStream1)
const suggestionStream2 = createSuggestionStream(responseStream, closeClickStream2)
const suggestionStream3 = createSuggestionStream(responseStream, closeClickStream3)

function createSuggestionStream (responseStream, closeClickStream) {
    return responseStream
        .map(getRandomUser) // returns new stream!
        .startWith(null)  // defining all stream dynamic behaviour at the time of declaration, start stream with null value
        .merge(refreshClickStream.map(() => null))
        .merge(closeClickStream.map(() => null))
        .merge(closeClickStream.combineLatest(responseStream, (click, usersList) => getRandomUser(usersList)))
}

function getRandomUser (usersList) {
    return usersList[Math.floor(Math.random() * usersList.length)]
}

suggestionStream1.subscribe(userOrNull => renderSuggestion(userOrNull, '.suggestions-list__suggestion--1'))
suggestionStream2.subscribe(userOrNull => renderSuggestion(userOrNull, '.suggestions-list__suggestion--2'))
suggestionStream3.subscribe(userOrNull => renderSuggestion(userOrNull, '.suggestions-list__suggestion--3'))


function renderSuggestion (user, suggestionSelector) {
    console.log('-----------------------------------')
    console.log('renderSuggestion(user, suggestionSelector) was called with:', user, suggestionSelector)
    const suggestionEl = suggestionsList.querySelector(suggestionSelector)
    if (user != null) {
        console.log('Rendering new user suggestion...');
        console.log(`user ${user.login} data is:`)
        console.dir(user)
        // rendering received elements to the DOM
        fillSuggestionWithData(suggestionEl, {
            img_url: user.avatar_url,
            title: user.login,
            title_link: user.html_url
        })
    } else if (user === null) {
        // clear previous elements in DOM
        console.log(`Clearing previous suggestion ${suggestionSelector}...`)
        suggestionEl.style.visibility = 'hidden'
        // const suggestionsElements = Array.from(suggestionsList.querySelectorAll('.suggestions-list__suggestion'))
        // suggestionsElements.forEach(suggestionEl => {
        //     suggestionEl.style.visibility = 'hidden'
        //     // suggestionEl.parentNode.removeChild(suggestionEl)
        //     // fillSuggestionWithData(suggestionEl, {avatar: '', login: '', description: '', link: ''})
        // })
    } else {
        console.warn('Unknown user value!', user)
    }
}

function fillSuggestionWithData (el, userData) {
    console.log('fillSuggestionWithData(el, userData) was called with:', el, userData)
    const image = el.querySelector('.media-card__image')
    const title = el.querySelector('.media-card__title')
    // const description = el.querySelector('.media-card__description')
    // const closeBtn = el.querySelector('.media-card__button--close')
    image.src = userData.img_url
    title.textContent = userData.title
    title.href = userData.title_link
    image.addEventListener('load', onImgLoad)

    function onImgLoad () {
        el.style.visibility = 'visible'
        image.removeEventListener('load', onImgLoad)
    }
}

console.log('6th_rx5.js was loaded!')