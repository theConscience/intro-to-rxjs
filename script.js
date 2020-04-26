import Rx from '@reactivex/rxjs'
// import * as Rx from 'rxjs'
// import * as rxjs from 'rxjs'

let source = Rx.Observable.interval(400).take(6)
    .map(i => ['1', '2', '12', 'assa', '*!23', '9', 'end'][i])

let result = source
    .map(x => parseInt(x))
    .filter(x => !isNaN(x))
    .reduce((x, y) => x + y)

result.subscribe(x => console.log(x))