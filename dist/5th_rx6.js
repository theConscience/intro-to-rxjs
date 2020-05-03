console.log('5nd_rx6.js is loading...')

// import * as Rx from 'https://dev.jspm.io/rxjs@6/_esm2015'
// import * as Op from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'
import { Observable, of, fromEvent, from } from 'https://dev.jspm.io/rxjs@6/_esm2015'
import { buffer, map, flatMap, filter, debounceTime } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'

let requestStream = of('https://api.github.com/users')

// 3rd try, uses flatMap, for flattening stream of promises-like streams...
let outerResponseStream = requestStream
    .pipe(
        flatMap(url => from(fetch(url).then(response => response.json())))
    )
outerResponseStream.subscribe(jsonData => console.log('outer response data:', jsonData))


console.log('5nd_rx6.js was loaded')