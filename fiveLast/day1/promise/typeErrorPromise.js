let Promise = require('./2.promise')

let promise = new Promise((resolve, reject) => {
  resolve(1)
})

let promise2 = promise.then(() => {
  return promise2;
})

// then如果返回的是一个promise,就会等到这个promise的执行完成，并且状态取决的这个返回的promise
// 这种循环引用，会出现永远不会执行完成的情况

promise2.then(() => {

}, (err) => {
  console.log(err) // TypeError: Chaining cycle detected for promise #<Promise>
})


