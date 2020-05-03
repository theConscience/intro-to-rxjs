console.log('3nd_rx5.js is loading...')

const Rx = window['Rx']
console.log('Rx is:', Rx)

// WHY? WE SHOULD USE EVENT STREAMS ?

// Because it allows you to specify dynamic behaviour of a value at the time of
// declaration which is opposite to this example:
let a = 3
let b = 10 * a  // static variable declaration, in time of this line passes the control flow
// and above declaration does not specify dynamic behaviour of value b at the time of declaration
console.log('b:', b)  // 30

// so trying to change 'a' value (on wich 'b' depends)
a = 4
console.log('b:', b)  // 30
// and we need to redeclare 'b' to get it value updated according to new 'a'
b = 11 * a  // and it's open to typos and errors... 

// and we just wanted to 'b' always be 10 * 'a'... To create some kind of dynamic
// binding, to save this law in our code...

// SO — we can use Event Streams to achieve that:

// let streamA = Rx.Observable.of(3)
let streamA = Rx.Observable.of(3, 4)
let streamB = streamA.map(a => 10 * a)  // we specified B's dynamic behaviour once 

// streamA.set(4)  // and some try to do this thing that way, but they shouldn't
// because we need to specify dynamic behaviour at the TIME OF DECLARATION (line 26 changes to line 27)
// so, we are specifying 'A's dynamic behaviour also, in line 26, adding second arg to .of() method

streamB.subscribe(b => console.log('streamB value:', b))

console.log('3nd_rx5.js was loaded!')