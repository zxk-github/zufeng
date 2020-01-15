const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    throw new Error('cycle use')
  }
  /**
   * then 返回的x 如果是promise 那就等待这个promise执行完成，当前then的状态取决于这个promise状态，值取决于当前promsie返回的值
   *  
   */
  if(typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    try {
      let then = x.then;
      let called;
      if(typeof then === 'function') {
        then.call(x, (y) => {
          if(called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (err) => {
          if(called) return;
          called = true;
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch {
      if(called) return;
      called = true;
      reject(x);
    }
  } else {
    // 简单值，直接resolve
    resolve(x)
  }
}

function isPromise(value) {
  if(typeof value === 'function' || (typeof value === 'object' && value !== null)) {
    if(typeof value.then === 'function') {
      return true
    }
  } 
  return false;
}

class Promise {
  constructor(excutor) {
    this.status = PENDING;
    this.value = '';
    this.reason = '';
    this.resolveQueues = [];
    this.rejectQueues = [];
    try{
      excutor(this._resolve.bind(this), this._reject.bind(this))\
    } catch(e) {
      this._reject(e);
    }
  }

  _resolve(value) {
    // 如果resolve的值是一个promise对象，需要等到这个promise执行完毕
    if(isPromise(value)) {
      value.then(this._resolve.bind(this), this._reject.bind(this))
    } else {
      if(this.status !== PENDING) return;
      // this.value = value;
      this.status = FULFILLED;
      this.resolveQueues.forEach(callback => callback())
    }
  }

  _reject(error) {
    if(this.status !== PENDING) return;
    // this.reason = error;
    this.status = REJECTED;
    this.rejectQueues.forEach(callback => callback())
  }

  /**
   *  onFulfilled, onRejected不是函数，那就忽略，状态向下传递
   */
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function'? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function'? onRejected: error => {throw error};
    let promise2;
    promise2 = new Promise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
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
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e);
          }
        })
      }

      if(this.status === PENDING) {
        this.resolveQueues.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        });
        this.rejectQueues.push(() => {
          setTimeout(() => {
            try{
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e);
            }
          })
        });
      }

    })
    return promise2;
  }

  catch(callback) {
    return this.then(null, callback);
  }

  static resolve(value){
    return new Promise((resolve) => {
      resolve(value)
    })
  }

  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value);
    })
  }

  static all(lists) {
    return new Promise((resolve, reject) => {
      let count = 0;
      let results = [];
      function formateResult(i, result) {
        results[i] = result;
        count ++;
        if(count === lists.length) {
          resolve(results)
        }
      }
      for(let i = 0; i < lists.length; i++) {
        let item = lists[i];
        if(isPromise(item)) {
          item.then((val) => {
            formateResult(i, val)
          }, (err) => {
            reject(err)
          })
        } else {
          formateResult(i, item)
        }
      }
    })
  }

  static race(lists) {
    return new Promise((resolve, rejecte) => {
      for(let i = 0; i < lists.length; i++) {
        let item = lists[i];
        if(isPromise(item)) {
          item.then((val) => {
            resolve(val)
          }, (err) => {
            reject(err)
          })
        } else {
          resolve(val)
        }
      }
    })
  }

  finally(callback) {
    return this.then((value) => {
      return Promise.resolve(callback).then(() => this.value);
    }, (err) => {
      return Promise.resolve(callback()).then(() => {throw err})
    })  
  }
}


