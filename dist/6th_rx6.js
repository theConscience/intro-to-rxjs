console.log('6nth_rx6.js is loading...')

import { Observable, of, fromEvent, from, merge } from 'https://dev.jspm.io/rxjs@6/_esm2015'
import { buffer, map, flatMap, startWith,filter, debounceTime } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'

const refreshBtn = document.querySelector('.refresh-btn')

// create Stream, for refresh button click events:
const refreshClickStream = fromEvent(refreshBtn, 'click')

// map clicks to url stream and adds initial value for startup:
const requestStream = refreshClickStream
    .pipe(
        startWith('startup click'),
        map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`)
    )

// use 3rd tryish style from 4th example...
let responseStream = requestStream
    .pipe(
        flatMap(url => from(fetch(url).then(response => response.json())))
    )

responseStream.subscribe(jsonData => console.log('response json data:', jsonData))


console.log('6th_rx6.js was loaded')