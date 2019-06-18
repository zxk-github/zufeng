// const myPromise = require('./4.myPromise')

const p1 = new Promise(function(resolve, reject) {
    // 异步走pengding
    // setTimeout(function() {
        resolve(1)
    // }, 1000)

    // 同步走fulfilled
    
})
new Promise(function(resolve, reject) {
    
}).then(() => {
    // 永远不会执行
})



// 下面这种情况就是循环引用
const p2 = p1.then(function(value) {
    value++
    console.log(value);
    return p2;  

    /**
     * return 后面的值 如果是promise执行完成才会向下执行，并且后面的then会对接return后面的promise
     * 现在返回的是p2 p2需要等待自己完成，这时会永远不会执行完成
     * */
    
}).then((data) => {
    console.log(data)
}) 
// .then的值只要不是函数 都会把前面的值传下去


console.time('cost')
const p3 = new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve(11)
    }, 2000)
})

const p4 = new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve(22)
    }, 1000)
})

Promise.all([p3, p4]).then((data) => {
    console.timeEnd('cost');
    console.log('resolve',data)
},(data) => {
    console.timeEnd('cost');
    console.log('reject', data)
})
