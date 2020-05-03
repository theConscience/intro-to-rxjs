console.log('4th_rx5.js is loading...')

const Rx = window['Rx']
console.log('Rx is:', Rx)

let requestStream = Rx.Observable.of('https://api.github.com/users')
requestStream.subscribe(url => {
    let responseStream = Rx.Observable.create(observer => {
        fetch(url)
        .then(response => response.json())
        .then(jsonData => observer.next(jsonData))
        .catch(err => observer.error(err))
        .finally(() => observer.complete())
    })

    responseStream.subscribe(response => console.log('Received response:', response))
})

let responseMetaStream = requestStream
    .map(url => Rx.Observable.fromPromise(fetch(url).then(response => response.json())))
responseMetaStream.subscribe(dataStream => console.log('dataStream:', dataStream))

let outerResponseStream = requestStream
    .flatMap(url => Rx.Observable.fromPromise(fetch(url).then(response => response.json())))
outerResponseStream.subscribe(response => {
    console.log('outer response:', response)
    // rendering `response` to the DOM...
})

console.log('4th_rx5.js was loaded!')