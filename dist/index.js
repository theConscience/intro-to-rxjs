'use strict';

// import { fromEvent } from 'rxjs'
import { Observable, Subject, ReplaySubject, from, fromEvent, of, range } from 'https://dev.jspm.io/rxjs@6/_esm2015';
import { map, filter, switchMap } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

console.log('index.js loaded')
console.log('fromEvent is:', fromEvent)

fromEvent(document, 'click').subscribe(() => console.log('clicked!'))
