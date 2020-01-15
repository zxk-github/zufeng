let Promise = require('./1.promise');

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('bbb')
  }, 300)
  throw new Error('q')
  reject('aaa')
})
promise.then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
})
promise.then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
})

// 如果then方法中的成功或者失败 执行的时候发生错误，会走下一个then的失败的回调
// 如果then方法返回一个失败的promise 他会走外层then的失败的回调


p = new Promise(() => {}).then()
// p.then()和p.then.then是有区别的


let p = new Promise((resolve, reject) => {
  resolve(1)
})

let p2 = p.then(() => {
  return p2
})



let obj = {}
Object.defineProperty(obj, name, {
  getter() {
    
  }
})