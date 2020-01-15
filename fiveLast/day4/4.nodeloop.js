// node的事件环是libuv实现的一个事件环机制
// 浏览器中通过队列来实现单线程操作

// 每一条都是一个队列
/**
 * timers 存放定时器的 setTimeout setInterval
 * pending callbacks 内部事件  比如文件读写
 * idle, prepare 内部调用
 * poll readFile 真正的I/O
 * check setImmediate执行
 * close callbacks
 */

/*
 timer中有东西，会获取到第一个，然后放到主栈中执行，然后依此拿完timer中的所有函数，然后进入poll，如果一个定时器3s之后执行，那么在这3s期间是不会放到timers队列中的
 poll中如果有读取文件等i/o操作，那就会向下走，执行check，也就是会执行setImmediate，如果没有，那就会回到timers执行新的一轮循环

 promise.then process.nextTick
 每次执行完timers中的所有宏任务，都会把微任务清空，队列执行清空之后，回向下一个队列执行
*/

// 这两个不一定 因为如果电脑性能特别好，执行timers队列的时候，定时器时间没有到
setTimeout(() => {

})
setImmediate(() => {

})


// 主栈代码直接完毕之后，立即执行process.nextTick
Promise.resolve().then(() => {
  console.log('then')
})
process.nextTick(() => {
  console.log('next Tick')
})

console.log(111)

/**
 *  微任务: promise.then MutationObserver process.nextTick
 *  宏任务: script  ajax setTimeout setInterval setImmediate MessageChannel I/O UI render
 */




setTimeout(function() {
  console.log('t1')
  Promise.resolve().then(() => {
    console.log(1)
  })
}, 0)

setTimeout(function() {
  console.log('t2')
  Promise.resolve().then(() => {
    console.log(2)
  })
}, 0)

setTimeout(function() {
  console.log('t3')
  Promise.resolve().then(() => {
    console.log(3)
  })
}, 0)