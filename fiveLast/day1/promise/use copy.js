let Promise = require('./2.promise');

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('bbb')
  }, 300)
  // throw new Error('q')
})
promise.then((res) => {
  console.log(res);
}, (err) => {
  console.log('2', err);
}).then((res) => {
  console.log('1', res);
}, (err) => {
  console.log('3', err);
})


let Promise = require('./2.promise');

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(new Promise((res) => {
      res(11);
    }))
  }, 300)
  // throw new Error('q')
})

promise.then((data) => {
  console.log(data)
})


var  p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(new Promise((res) => {
      res(11);
    }))
  }, 300)
  // throw new Error('q')
})

p.finally(() => {   // 无论如何都会执行 不会干扰promise状态的传递
  console.log('hello')
  return new Promise((resolve, reject) => { // 如果返回值是一个promise对象，会等待finally执行完毕之后才会向下走, 这个promis resolve出来的和reject出来的值不会被接受
    setTimeout(() => {
      resolve(2222);
    }, 3000)
  })  
}).then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})