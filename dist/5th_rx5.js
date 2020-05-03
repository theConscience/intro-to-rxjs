console.log('5th_rx5.js is loading...')

const Rx = window['Rx']
console.log('Rx is:', Rx)

// renamed request Stream, because that's one we do on app startup:
let startupRequestStream = Rx.Observable.of('https://api.github.com/users')
startupRequestStream.subscribe(url => console.log('startup request url will be:', url))

const refreshBtn = document.querySelector('.refresh-btn')

// create another Stream, for refresh button click events:
const refreshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click')
refreshClickStream.subscribe(evt => console.log('Refresh click fired!'))

const refreshRequestStream = refreshClickStream
    .map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`)
refreshRequestStream.subscribe(url => console.log('refresh request url will be a random url, for example:',url))

// merging above 2 Streams into one:
const requestStream = Rx.Observable.merge(startupRequestStream, refreshRequestStream)
requestStream.subscribe(response => console.log('merged request stream response:', response))

// use 3rd tryish tyle from 4th example...
const responseStream = requestStream
    .flatMap(url => Rx.Observable.fromPromise(fetch(url).then(response => response.json())))
responseStream.subscribe(jsonData => console.log('response json data:', jsonData))

console.log('5th_rx5.js was loaded!')