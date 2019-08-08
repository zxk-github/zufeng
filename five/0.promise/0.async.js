/**
 * async/await
 * async 用来申明一个function是异步的 await用于等待一个异步任务的完成
 * 
 *  */
async function fn() {
    await 2;
    return Promise.resolve(5);
}
// 没有返回值Promise.resolve(undefined)
fn().then((value) => {
    console.log(value)
})

/** 
 * await后面可以接任何表达式
 * 如果等待的不是一个promise， 那么await表达式运行的结果就是他后面表达式运行的结果
 * 如果等的是promise 那么await就是后面promise resolve出来的值
*/




async function async1() {
    console.log('async1 start')
    await async2()   
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}
async1();
console.log('script start')
/**
 * await 先等待右边表达式的执行结果 然后向左看到await 让出线程 阻塞代码 全局代码继续向下执行
 *  */

