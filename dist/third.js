console.log('third.js is loading...')

import * as Rx from 'https://dev.jspm.io/rxjs@6/_esm2015'
import * as Op from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'

const btn = document.querySelector('.some-btn')
const label = document.querySelector('h4')

let clickStream = Rx.fromEvent(btn, 'click')
let doubleClickStream = clickStream
    .pipe(
        Op.bufferTime(200),
        Op.map(arr => arr.length),
        Op.filter(len => len === 1)
    )

doubleClickStream.subscribe(evt => label.textContent = 'double click')

doubleClickStream
    .pipe(
        Op.throttle(1000)
    )
    .subscribe(suggestion => label.textContent = '—')

console.log('third.js was loaded')