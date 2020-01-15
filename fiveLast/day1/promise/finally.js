// finally 无论如何都会执行
// finally 不会改变上层promise状态和值，下层的promise可以获取上层的值和状态
// finally 返回的如果是一个promise对象，会等待这个promise执行完毕，才会向下执行，并且这个promise不会决定下面promise状态

let promise = new Promise((resolve, reject) => {
  reject(100)
})

promise.finally(() => {
  // console.log('hello')
  return new Promise((resolve, reject) => {  // 返回的是一个promise会在finally内部等待执行完成之后才会向下执行
    setTimeout(() => {
      console.log(33);
      resolve();
    }, 2000)
  })
}).then((result) => {
  console.log(result)
}).catch((err) => {
  console.log(err);
});



// resolve的参数如果是一个promise需要等到这个promise执行完毕，这个promise的状态决定着当前所处promise的状态
// reject的参数无论是什么 都不会等待执行完毕直接确定当前promise是一个失败态
let p = new Promise((resolve, reject) =>{
  resolve(new Promise((res, rej) => {
    setTimeout(() => {
      rej(1);
    }, 2000)
  }))

  reject(new Promise((res, rej) => {
    setTimeout(() => {
      res(1);
    }, 2000)
  }))
})
p.then((value) => {
  console.log(value);
}, (err) => {
  console.log('22', err);
})



