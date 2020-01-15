// Promise try的实现
// 使用方式

function fn() {
  return new Promise((resolve, reject) => {
    reject(123)
  })
}
function fn() {
  throw new Error(123)
}
function fn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(123)
    }, 100);
  })
}


Promise.try = function(fn) {
  return new Promise((resolve, reject) => {
    resolve(fn())
  })
}


// 希望通过Promise.try让fn执行，同时fn执行时候出现reject,可以通过catch捕获到，或者fn函数直接throw new Error都能被捕获到
Promise.try(fn).catch((err) => {
  console.log(err)
})