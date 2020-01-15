setTimeout(() => console.log('setTimeout1'), 0);
setTimeout(() => {
    console.log('setTimeout2');
    Promise.resolve().then(() => {
        console.log('promise3');
        Promise.resolve().then(() => {
            console.log('promise4');
        })
        console.log(5)
    })
    setTimeout(() => console.log('setTimeout4'), 0);
}, 0);
setTimeout(() => console.log('setTimeout3'), 0);
new Promise(() => {
    console.log(1);
})
console.log(2);
Promise.resolve().then(() => {
    console.log('promise1');
})

// 1 2 promise1   setTimeout1 setTimeout2 promise3 5 promise4 setTimeout4

// 每次循环之前清除

// timer 
// i/o 
// checkout


// 1. nextTick queue  microtask queue

// 1 2 promise1  setTimeout1 setTimeout2 setTimeout3 promise3 5 promise4 setTimeout4


var b = 10;
(function b() {
    b = 20;
    console.log(b);
})()

