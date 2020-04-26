console.log('1st_rx5.js is loading...')

// import * as Rx from 'https://dev.jspm.io/rxjs@5/_esm2015'
// import * as Op from 'https://dev.jspm.io/rxjs@5/_esm2015/operators'
// import * as Rx from '../node_modules/rxjs5'

// import * as Rx from 'https://npmcdn.com/rxjs@5.0.0-beta.1/bundles/Rx.umd.js'

// Added script tag to HTML file
const Rx = window['Rx']
console.log('Rx is:', Rx)

const source = Rx.Observable.interval(2000).take(7)
    .map(i => ['1', '2', '3', 'hello', '5', 'need', '11', 10, 'end'][i])

source.subscribe(x => console.log(x))

const result = source
    .map(x => parseInt(x))
    .filter(x => !isNaN(x))
    // .reduce((x, y) => x + y)

result.subscribe(x => console.log(x))

console.log('1st_rx5.js was loaded!')