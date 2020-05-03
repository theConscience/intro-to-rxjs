console.log('5nd_rx6.js is loading...')

// import * as Rx from 'https://dev.jspm.io/rxjs@6/_esm2015'
// import * as Op from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'
import { Observable, of, fromEvent, from, merge } from 'https://dev.jspm.io/rxjs@6/_esm2015'
import { buffer, map, flatMap, filter, debounceTime } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'

let startupRequestStream = of('https://api.github.com/users')
startupRequestStream.subscribe(url => console.log('startup request url will be:', url))

const refreshBtn = document.querySelector('.refresh-btn')

// create another Stream, for refresh button click events:
const refreshClickStream = fromEvent(refreshBtn, 'click')
refreshClickStream.subscribe(evt => console.log('Refresh click fired!'))

const refreshRequestStream = refreshClickStream
    .pipe(
        map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`)
    )
refreshRequestStream.subscribe(url => console.log('refresh request url will be a random url, for example:',url))

// merging above 2 Streams into one:
const requestStream = merge(startupRequestStream, refreshRequestStream)
requestStream.subscribe(response => console.log('merged request stream response:', response))

// 3rd try, uses flatMap, for flattening stream of promises-like streams...
let responseStream = requestStream
    .pipe(
        flatMap(url => from(fetch(url).then(response => response.json())))
    )
responseStream.subscribe(jsonData => console.log('response json data:', jsonData))


console.log('5nd_rx6.js was loaded')