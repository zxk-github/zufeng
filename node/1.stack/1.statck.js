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
Promise.resolve().then(() => {
    console.log('promise1');
})
// promise1 setTimeout1 setTimeout2 setTimeout3 promise3 5 promise4 setTimeout4 

/**
 * node中的event loop是libuv提供的， 他为node提供跨平台， 线程池，事件池，和异步i/o的能力
 * event loop是libuv的核心所在，js是单线程的，会把回调和任务交给libuv
 * 何时来调用回调就是libuv实现的event loop来实现的
 * event loop首先会在内部维持多个事件队列，比如时间队列，网络队列，libuv内部执行一个
 * 
 *  */
 
// 浏览器端执行规则 一个宏任务 所有微任务 
