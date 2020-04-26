console.log('2nd_rx5.js is loading...')

const Rx = window['Rx']
console.log('Rx is:', Rx)

const button = document.querySelector('.some-btn')
const label = document.querySelector('h4')

let clickStream = Rx.Observable.fromEvent(button, 'click')
clickStream.subscribe(() => console.log('click'))

let dblClickStream = clickStream
    .buffer(clickStream.debounceTime(250))
    .map(arr => {
        console.log('arr:', arr)
        return arr.length
    })
    .filter(len => {
        console.log('len:', len)
        return len === 2
    })

dblClickStream.subscribe(evt => {
    console.log('double click!')
    label.textContent = 'double click!'
})

dblClickStream
    .debounceTime(1000)
    .subscribe(evt => {
        console.log('clearing button after 1 sec')
        label.textContent = '—'
    })

console.log('2nd_rx5.js was loaded!')