// js代码执行是一个单线程的，在主线程中执行
// setTimeout ajax click会开辟新的线程
// 浏览器的每一个tab页都是一个进程，进程中开辟主线程
// UI js共用一个线程
// 默认代码执行会在执行栈中执行

// 执行上下文  执行函数的时候会产生执行上下文 放到执行栈中
// 作用域  函数定义的时候，决定作用域
// 作用域链进行查找

// 浏览器的代码初始化执行js脚本就是一个洪任务
// 宏任务 ui渲染 script 事件 ajax setTimeout
// promise.then

async function async1() {
    console.log('async1 start');
    // await async2
    async2().then(() => {
        Promise.resolve().then(() => {
            console.log('async1 end')
        })
    })
}

async function async2() {
    console.log('async1 start');
}

let a = function b() {

}
let a = class b {

}
console.log(typeof b);

// isNative 
// webworker 单独开一个线程 
