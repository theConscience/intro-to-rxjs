console.log('6nth_rx6.js is loading...')

import { Observable, of, fromEvent, from, merge, combineLatest } from 'https://dev.jspm.io/rxjs@6/_esm2015'
import { buffer, map, flatMap, startWith, filter, shareReplay, publishReplay, debounceTime } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'

const refreshBtn = document.querySelector('.refresh-btn')
const suggestionsList = document.querySelector('.suggestions-list') 
const closeBtn1 = suggestionsList.querySelector('.suggestions-list__suggestion--1 .media-card__button--close')
const closeBtn2 = suggestionsList.querySelector('.suggestions-list__suggestion--2 .media-card__button--close')
const closeBtn3 = suggestionsList.querySelector('.suggestions-list__suggestion--3 .media-card__button--close')

// create Stream, for refresh button click events:
const refreshClickStream = fromEvent(refreshBtn, 'click')
const closeClickStream1 = fromEvent(closeBtn1, 'click')
const closeClickStream2 = fromEvent(closeBtn2, 'click')
const closeClickStream3 = fromEvent(closeBtn3, 'click')

// map clicks to url stream and adds initial value for startup:
const requestStream = refreshClickStream
    .pipe(
        startWith('startup click'),
        map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`)
    )

// use 3rd tryish style from 4th example...
let responseStream = requestStream
    .pipe(
        flatMap(url => from(fetch(url).then(response => response.json()))),
        shareReplay(1)
        // publishReplay().refCount(1)
    )

// responseStream.subscribe(jsonData => console.log('response json data:', jsonData))

const suggestionStream1 = createSuggestionStream(responseStream, closeClickStream1)
const suggestionStream2 = createSuggestionStream(responseStream, closeClickStream2)
const suggestionStream3 = createSuggestionStream(responseStream, closeClickStream3)

function createSuggestionStream (responseStream, closeClickStream) {
    return merge(
            responseStream.pipe(
                map(getRandomUser), // returns new stream!
                startWith(null),  // defining all stream dynamic behaviour at the time of declaration, start stream with null value
            ),
            refreshClickStream.pipe(map(() => null)),
            closeClickStream.pipe(map(() => null)),
            combineLatest(closeClickStream, responseStream, (click, usersList) => getRandomUser(usersList)),
        )
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
console.log('6th_rx6.js was loaded')