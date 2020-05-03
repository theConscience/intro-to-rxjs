console.log('4nd_rx6.js is loading...')

// import * as Rx from 'https://dev.jspm.io/rxjs@6/_esm2015'
// import * as Op from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'
import { Observable, of, fromEvent, from } from 'https://dev.jspm.io/rxjs@6/_esm2015'
import { buffer, map, flatMap, filter, debounceTime } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'

let requestStream = of('https://api.github.com/users')

// 1st try, ugly callback-hell like:
requestStream.subscribe(url => {
    let responseStream = Observable.create(observer => {
        fetch(url)
        .then(response => response.json())
        .then(jsonData => observer.next(jsonData))
        .catch(err => observer.error(err))
        .finally(() => observer.complete())
    })

    responseStream.subscribe(response => console.log('Response was:', response))
})

// 2nd try, uses valid stream methods, no folding, but got metaStream of promises:
let responseMetaStream = requestStream
    .pipe(
        map(url => from(fetch(url).then(response => response.json())))
    )
responseMetaStream.subscribe(promiseStream => console.log('promiseStream is:', promiseStream))

// 3rd try, uses flatMap, for flattening stream of promises-like streams...
let outerResponseStream = requestStream
    .pipe(
        flatMap(url => from(fetch(url).then(response => response.json())))
    )
outerResponseStream.subscribe(jsonData => console.log('outer response data:', jsonData))


console.log('4nd_rx6.js was loaded')