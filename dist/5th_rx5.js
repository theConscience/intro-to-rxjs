console.log('5th_rx5.js is loading...')

const Rx = window['Rx']
console.log('Rx is:', Rx)

const refreshBtn = document.querySelector('.refresh-btn')

// create Stream, for refresh button click events:
const refreshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click')
refreshClickStream.subscribe(evt => console.log('Refresh click fired!'))

// map clicks to url stream and adds initial value for startup:
const requestStream = refreshClickStream
    .map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`)
    .startWith('https://api.github.com/users')
requestStream.subscribe(response => console.log('merged request stream response:', response))

// use 3rd tryish tyle from 4th example...
const responseStream = requestStream
    .flatMap(url => Rx.Observable.fromPromise(fetch(url).then(response => response.json())))
responseStream.subscribe(jsonData => console.log('response json data:', jsonData))

console.log('5th_rx5.js was loaded!')