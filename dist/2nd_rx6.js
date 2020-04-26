console.log('2nd_rx6.js is loading...')

import * as Rx from 'https://dev.jspm.io/rxjs@6/_esm2015'
import * as Op from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'


const btn = document.querySelector('.some-btn')
const label = document.querySelector('h4')

let clickStream = Rx.fromEvent(btn, 'click')
clickStream.subscribe(() => console.log('click'))

let doubleClickStream = clickStream
    .pipe(
        Op.buffer(clickStream.pipe(Op.debounceTime(250))),
        Op.map(arr => {
            console.log('arr:', arr)
            return arr.length
        }),
        Op.filter(len => {
            console.log('len:', len)
            return len === 2
        })
    )

doubleClickStream.subscribe(evt => {
    console.log('double click!')
    label.textContent = 'double click'
})

const secondAfterDoubleClickStream = doubleClickStream
    .pipe(
        Op.debounceTime(1 * 1000)
    )

secondAfterDoubleClickStream.subscribe(evt => {
    console.log('removing label...')
    label.textContent = '—'
})

console.log('2nd_rx6.js was loaded')