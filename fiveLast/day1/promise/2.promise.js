const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
/**
 *  promise2 then方法返回的promise对象
 *  x 当前then函数参数执行的结果
 *  resolve then方法返回的promise的resolve
 *  reject then方法返回的primise的reject
 */
function resovePromise(promise2, x, resolve, reject) {
  if(promise2 ===x ) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  /**
   * 如果 resovePromise和rejectedPromise都被调用了，或者多次调用相同的promise，仅仅第一次有效
   */
  let called;// (为了辨别当前这个x不被调用多次)
  // 如何判断是不是一个promise实例，那就看看 它有没有then方法
  if(typeof x === 'function' || (typeof x === 'object' && x != null)) {
    try {
      let then = x.then;  // 获取then方法可能会抛出错误 比如通过Objec.defineProperty定义的getter 直接在里面抛错错误
      if(typeof then === 'function') {
        /**
         *  p.then(() => {
         *    return new Promise((resolve) => {
         *       resolve(100)
         *    })
         *  }) 
         *  p.then(() => {
         *    return new Promise((resolve) => {
         *       resolve(new Promise((resolve) => {
         *        resolve(100) 
         *       }))
         *    })
         *  })
         *  
         *  
         */
        then.call(x, y => { // 如果promise是成功的就向下传递，失败的就让下一个失败
          // resolve(y)
          if(called) return;
          called = true;
          // 防止出现上面情况，y依旧是一个promise
          resovePromise(promise2, y, resolve, reject)
        }, err => {
          if(called) return;
          called = true;
          reject(err)
        }) // 不要使用x.then 否则会再次取值
      } else {
        resolve(x)
      }
    } catch(e) {
      if(called) return;
      called = true;
      reject(e)
    }
  } else { // x是常量
    resolve(x)

  }
}

class Promise {
  constructor(excutor) {
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallBacks = [];
    this.onRejectedCallBacks = [];
    this.status = PENDING;
    try{
      excutor(this._resolved.bind(this), this._rejected.bind(this));
    } catch(e) {
      this._rejected(e)
    }
  }

  _resolved(value) {
    if(value instanceof Promise) { // 说明resolve的参数是一个Promise对象，会让这个pormise执行，执行之后的结果
      return value.then(this._resolved.bind(this), this._rejected.bind(this))
    }
    if(this.status !== PENDING) {
      return;
    }
    this.status = FULFILLED;
    this.value = value;
    this.onResolvedCallBacks.forEach(fn => fn())
  }

  _rejected(reason) {
    if(this.status !== PENDING) {
      return;
    }
    this.status = REJECTED;
    this.reason = reason;
    this.onRejectedCallBacks.forEach(fn => fn())
  }

  then(onFulfilled, onRejected) {
    // 解决穿透问题  then的第二个参数如果，没有throw错误，下一个resolve会接受return的值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};
    let promise2;
    promise2 = new Promise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try{
            let x = onFulfilled(this.value);
            // resolve(x)
            resovePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      } 
      if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            // resolve(x)
            resovePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      }  
      if(this.status === PENDING) {
        this.onResolvedCallBacks.push(() => {
          setTimeout(() => {
            try{
              let x = onFulfilled(this.value);
              // resolve(x)
              resovePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallBacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resovePromise(promise2, x, resolve, reject)
              // resolve(x)
            } catch(e) {
              reject(e)
            }
          })
          
        })
      }
    })
    return promise2
  }

  catch(errCallback) { // 用来捕获错误
    return this.then(null, errCallback);
  }
  static resolve(value) {
    return new Promise((resolve)=> {
      resolve(value)
    })
  }

  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value)
    })
  }

  static all(values) {
    return new Promise((resolve, reject) => {
      let arr = [];
      let count = 0;
      let processData = (key, value) => {
        arr[key] = value;
        count ++;
        if(count === values.length) {
          resolve(arr);
        }
      }
      for(let i = 0; i < values.length; i++ ) {
        let current = values[i];
        if(isPromise(current)) {
          current.then(y => {
            processData(i, y)
          }, reject)
        } else {
          processData(i, current)
        }
      }
    })
  }

  static race(values) { // 一个成功就成功，一个失败就失败
    return new Promise((resolve, reject) => {
      for(let i = 0; i < values.length; i++) {
        let current = values[i];
        if(isPromise(current)) {
          current.then(resolve, reject);
        } else {
          resolve(current)
        }
      }
    })
  } 

  // finally(callback) {  // 无论如何都会执行 不会接受新的值并且会把上一个状态和值向下传递 
  //   return this.then((data) => {
  //     return new Promise((resolve, reject) => {
  //       resolve(callback());
  //     }).then(() => data)
  //     // return data;
  //   }, (err) => {
  //     return new Promise((resolve, reject) => {
  //       resolve(callback());
  //     }).then(() => {throw err});
  //     // throw err
  //   })
  // }
  finally(callback) {
    return this.then((data) => {
      return Promise.resolve(callback()).then(() => data);
    }, (err) => {
      // 如果是promise.reject() 就不会等待callback执行了，直接就失败了
      return Promise.resolve(callback()).then(() => {throw err})
    })
  }


}

function isPromise(value) {
  if(typeof value === 'function' || (typeof value === 'object' && value !== null)) {
    if(typeof value.then === 'function') {
      return true;
    }
  }
  return false;
}


// 一个延迟对象
Promise.defer = function() {
  let defer = {};
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  })
  return defer
}
// 使用
/*
function read(url) {
  let defer = Promise.defer();
  fs.readFile('url', (err, data) => {
    if(err) {
      defer.reject(err);
    }
    defer.resolve(data);
  })
  return defer.promise;
}
read().then(() => {})
*/

module.exports = Promise;