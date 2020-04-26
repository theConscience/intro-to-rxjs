'use strict';

// import { fromEvent } from 'rxjs'
import { Observable, Subject, ReplaySubject, from, fromEvent, of, range, interval, } from 'https://dev.jspm.io/rxjs@6/_esm2015';
import { map, filter, switchMap, scan, throttleTime, take, reduce } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

console.log('index.js loaded')


// 

fromEvent(document, 'click')
    .pipe(
        throttleTime(1000),
        scan(count => count + 1, 0)
    )
    .subscribe(count => console.log(`clicked ${count} times!`))

fromEvent(document, 'click')
    .pipe(
        throttleTime(1000),
        map(evt => evt.clientX)
    )
    .subscribe(mousePosX => console.log(`clicked in ${mousePosX}`))


//

const btn = document.querySelector('.refresh-btn') 
fromEvent(btn, 'click')
    .pipe(throttleTime(2000))
    .subscribe(() => console.log('refreshing...'))


// 

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

console.log('index.js finished loading')