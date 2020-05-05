console.log('6th_rx5.js is loading...')

const Rx = window['Rx']
console.log('Rx is:', Rx)

const refreshBtn = document.querySelector('.refresh-btn')
const suggestionsList = document.querySelector('.suggestions-list') 

// create Stream, for refresh button click events:
const refreshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click')

// map clicks to url stream and adds initial value for startup:
const requestStream = refreshClickStream.startWith('startup click')
    .map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`) // returns new stream

// use 3rd tryish style from 4th example...
const responseStream = requestStream
    .flatMap(url => Rx.Observable.fromPromise(fetch(url).then(response => response.json())))
    .publishReplay().refCount(1)

// responseStream.subscribe(jsonData => console.log('response json data:', jsonData))

const suggestionStream1 = createSuggestionStream(responseStream)
const suggestionStream2 = createSuggestionStream(responseStream)
const suggestionStream3 = createSuggestionStream(responseStream)

function createSuggestionStream (responseStream) {
    return responseStream
        .map(usersList => usersList[Math.floor(Math.random() * usersList.length)]) // returns new stream!
        .startWith(null)  // defining all stream dynamic behaviour at the time of declaration, start stream with null value
        .merge(refreshClickStream.map(ev => null))
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
        suggestionEl.style.visibility = 'visible'
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
}

console.log('6th_rx5.js was loaded!')