console.log('additional.js is loading...')

// import * as Rx from 'https://dev.jspm.io/rxjs@5/_esm2015'
// import * as Op from 'https://dev.jspm.io/rxjs@5/_esm2015/operators'
import * as Rx from '../node_modules/rxjs5'

const source = Rx.Observable.interval(2000).take(5)
    .map(i => ['1', '2', '3', 'hello', '5', 'end'])

const result = source.map(x => parseInt(x))
result.subscribe(x => console.log(x))

console.log('additional.js was loaded!')