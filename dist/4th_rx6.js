console.log('4nd_rx6.js is loading...')

// import * as Rx from 'https://dev.jspm.io/rxjs@6/_esm2015'
// import * as Op from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'
import { Observable, of, fromEvent } from 'https://dev.jspm.io/rxjs@6/_esm2015'
import { buffer, map, filter, debounceTime } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'

let requestStream = of('https://api.github.com/users')
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

console.log('4nd_rx6.js was loaded')