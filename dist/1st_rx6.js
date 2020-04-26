console.log('1st_rx6.js is loading...')

import { interval } from 'https://dev.jspm.io/rxjs@6/_esm2015'
import { map, filter, take, reduce } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'


// 1st example from docs/video rewritten to rxjs6

const arr = ['1', '2', '3', 'hello', '321', 'number']
const arrStream = interval(400)
    .pipe(
        take(5),
        map(i => arr[i])
    )

arrStream.subscribe(x => console.log(x)) 

const numStream = arrStream
    .pipe(
        map(x => parseInt(x, 10)),
        filter(x => !isNaN(x)),
        reduce((x, y) => x + y)
    )

numStream.subscribe(x => console.log(x))

console.log('1st_rx6.js was loaded')