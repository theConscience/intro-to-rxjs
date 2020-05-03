console.log('3nd_rx6.js is loading...')

// import * as Rx from 'https://dev.jspm.io/rxjs@6/_esm2015'
// import * as Op from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'
import { of, fromEvent } from 'https://dev.jspm.io/rxjs@6/_esm2015'
import { buffer, map, filter, debounceTime } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'

let streamA = of(3, 4)
let streamB = streamA.pipe(map(a => a * 10))

streamB.subscribe(b => console.log('streamB value:', b))

console.log('3nd_rx6.js was loaded')