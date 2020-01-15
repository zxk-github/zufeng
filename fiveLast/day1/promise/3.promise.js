const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 1. 如果onFulfilled执行返回的是promise,那就等到promise执行完毕，并且当前then的状态取决于这个promise的状态
 * 2. 如果不是promise 那就直接resolve
 */
function isPromise(value) {
  if(typeof value === 'function' || (typeof value === 'object' && value !== null)) {
    if(value.then === 'function') {
      return true;
    }
  }
  return false;
}

function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    throw new Error('cycle use')
  }
  let called;
  if(typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    try{
      let then = x.then;
      if(typeof then === 'function') {
        then.call(x, (y) => {
          if(called) return;
          called = true; 
          resolvePromise(y)
        }, (error) => {
          if(called) return;
          called = true; 
          reject(error)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if(called) return;
      called = true; 
      reject(e);
    }
  } else {
    resolve(x)
  }
}


class Promise {
  constructor(excutor) {
    this.status = PENDING;
    this.value = '';
    this.reason = '';
    this.fulFilledQueues = [];
    this.rejectedQueues = [];
    excutor(this._resolve.bind(this), this._reject.bind(this));
  }
  _resolve(value) {
    // if value是promise对象，应该让当前value执行，并且promise状态决定当前promise状态
    if(isPromise(value)) {
      value.then(this._resolve.bind(this), this._reject.bind(this))
    }
    if(this.status !== PENDING) return;
    this.value = value;
    this.status = FULFILLED; 
    this.fulFilledQueues.forEach((callback) => {
      callback()
    })
  }
  _reject(error) {
    if(this.status !== PENDING) return;
    this.reason = error;
    this.status = REJECTED;
    this.rejectedQueues.forEach((callback) => {
      callback();
    })
  }
  // 1. 如果onFulfilled, onRejected不是函数，那么状态和值像下传递
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : error => {throw error};
    let promise2;
    promise2 = new Promise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try{
            let x = onFulfilled(this.value);
            // resolve(x);
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)        
      }
      if(this.status === REJECTED) {
        setTimeout(() => {
          try{
            let x = onRejected(this.reason);
            resolve(x);
          } catch(e) {
            reject(e)
          }  
        }, 0);
      }
      if(this.status === PENDING) {
        this.fulFilledQueues.push(() => {
          setTimeout(() => {
            try{
              let x = onFulfilled(this.value);
              resolve(x);
            } catch(e) {
              reject(e)
            }
          }, 0);
        });
        this.rejectedQueues.push(() => {
          setTimeout(() => {
            try{
              let x = onRejected(this.reason);
              resolve(x);
            } catch(e) {
              reject(e)
            }  
          }, 0);
        });
      }

    })
    return promise2;
  }

  catch(callback) {
    return this.then(null, callback)
  }
  static resolve(value) {
    return new Promise((resolve) => {
      resolve(value)
    })
  }

  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value)
    })
  }

  // 无论如何都会执行这个回调函数，并且回调函数不会影响then的状态
  finally(callback) {
    return this.then((data) => {
      return Promise.resolve(callback()).then(() => data);
    }, (error) => {
      return Promise.resolve(callback()).then(() => {throw error})
    })
  }
  static all(lists) {
    return new Promise((resolve, reject) => {
      let results = [];
      let count = 0;
      let formatDate = (index, result) => {
        results[index] = result
        count ++;
        if(count === lists.length) {
          resolve(results)
        }
      }
      for(let i = 0; i < lists.length; i++) {
        if(isPromise(lists[i])) {
          lists[i].then((data) => {
            formatDate(i, data) 
          }, (error) => {
            reject(error)
          })
        } else {
          formatDate(i, lists[i])
        }
      }
    })
  }
  static race(lists) {
    return new Promise((resolve, reject) => {
      for(let i = 0; i < lists.length; i++) {
        if(isPromise(lists[i])) {
          lists[i].then((data) => {
            resolve(data)
          }, (error) => {
            reject(error)
          })
        } else {
          resolve(lists[i])
        }
      }
    })
  }
} 