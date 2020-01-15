// js主线程是单线程的， 浏览器是多线程的
// setTimeout ajax click这些都会开辟一个新的线程

// 主线程里面UI线程和js线程是互斥的关系，一个时间只能有一个执行，默认执行代码的时候，会在执行栈中执行

// 执行上下文 执行函数的时候会产生执行上下文
// 作用域 函数定义的时候，就确定了作用域(js是静态作用域)

// 栈 先进后出 队列 先进先出


setTimeout(() => {
  console.log('s1')
  Promise.resolve().then(() => {
    console.log('p1')
  })
})

setTimeout(() => {
  console.log('s2')
})

Promise.resolve().then(() => {
  console.log('p2')
})

// node p2 s1 s2 p1
// chrome p2 s1 p1 s2
// chrome和node 11 一样 都是先清空微任务之后才会清空callback

// 宏任务: ui渲染 script脚本默认就是macrotask ajax setTimeout 
// 微任务: promise.then

const p = Promise.resolve();
(() => {
  const i_promise = new Promise(resolve => {
    console.log('iife1')
    const promise = new Promise(res => res(p));
    console.log('iife2')
    promise.then(() => {
      console.log('after:await');
      resolve();
    })
  })
  return i_promise;
})()

p.then(() => {
  console.log('tick:a')
}).then(() => {
  console.log('tick:b')
}).then(() => {
  console.log('tick:c')
})


// 浏览器 编译一次 
// async function async1() {
//   console.log('async1 start');
//   // await async2();
//   async2().then(() =>{
//     console.log('async1 end');
//   })
// }
// await 编译之后是什么

// node 编译两次
// async function async1() {
//   console.log('async1 start');
//   // await async2();
//   async2().then(() =>{
//     Promise.then(() => {
//       Promise.resolve().then(() => {
//         console.log('async1 end')
//       })
//     })
//   })
// }
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(() => {
  console.log('setTimeout')
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})
console.log('script end')
// script start 
// async1 start 
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// aysnc执行方式



let  a = function b() {} // 这种申明变量函数的形式 b是被忽略的
console.log(typeof b) // undefined

// $nextTick实现 事件环
// 判断一个promise是不是原生promise
function isNative() {
  return typeof Promise === 'function' && /native code/.test(Promise.toString())
}

function $nextTick(callback) {
  if(typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve();
    timenFunc = () => {
      p.then(callback)
    }
  } else if(typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(callback)  // 微任务
    observer.observe(container, {
      childList: true
    })
  } else if(typeof setImmediate !== 'undefined') {
    setImmediate(callback)
  } else {
    setTimeout(callback, 0)
  }
}

// MutationObserver DOM4  dom操作完成之后，执行回调函数函数

// 消息通道 MessageChannel


