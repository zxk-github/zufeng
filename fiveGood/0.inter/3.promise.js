const PENDING = 'pending';
const FULFULLED = 'fulfilled';
const REJECTED = 'rejected';

function isFunction(value) {
  return typeof value === 'function'
}

/**
 * 1.promise执行由pending变为fulfilled或者rejected
 * 2.resolve--> fulfilled reject --> rejected
 */

class MyPromise {
  constructor(excutor) {
    this._value = undefined;
    this._status = PENDING;
    this._fullfilledQueues = [];
    this._rejectedQueues = [];
    try {
      excutor(this._resolve.bind(this), this._reject.bind(this));
    } catch(e) {
      this._rejected(e) 
    }
  }

  _resolve(value) {
    if(this._status !== PENDING) return;

    const run = () => {
      const runFulfilled = (val) => {
        let cb;
        while(cb = this._fullfilledQueues.shift()) {
          cb(val)
        }
      }

      const runRejected = (reason) => {
        let cb;
        while(cb = this._rejectedQueues.shift()) {
          cb(reason)
        }
      }

      if(value instanceof MyPromise) {
        value.then((val) => {
          this._status = FULFULLED;
          this._value = val;
          runFulfilled(val)
        }, (reason) => {
          this._status = REJECTED;
          this._value = reason;
          runRejected(reason);
        })
      } else {
        this._value = value;
        this._status = FULFULLED;
      }
    }
    setTimeout(() => run(), 0);
  }

  _rejected(reason) {
    if(this._status !== PENDING) return;
    
    const run = () => {
      this._value = reason;
      this._status = REJECTED;
      let cb;
      while(cb = this._rejectedQueues.shift()) {
        cb(reason);
      }
    }
    setTimeout(() => run(), 0);
  }

  /**
   * 1. then返回的是一个promise对象
   * 2. 如果onFulfilled, onRejected不是一个函数，那么直接忽略，返回的promise状态延续上一个promsie
   * 3. 如果上一个promise返回的是一个promsie对象，必须等待这个promise执行完毕，并且这个promsie状态决定then返回的promise状态
   * 
   */
  then(onFulfilled, onRejected) {
    const {_value, _status} = this;
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      const fulfilled = (value) => {
        try {
          if(!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            let res = onFulfilled(value);
            if(res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res);
            }
          }
        } catch(err) {
          onRejectedNext(err);
        }
      }

      const rejected = (reason) => {
        try{
          if(!isFunction(onRejected)) {
            onRejectedNext(reason)
          } else {
            let res = onRejected(reason);
            if(res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(res)
            }
          }
        } catch(e) {
          onRejectedNext(e)
        }
      }

      switch(_value) {
        case PENDING: 
          this._fullfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
          break;
        case FULFULLED: 
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if(value instanceof MyPromise) return value;
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }

  static reject(value) {
    if(value instanceof MyPromise) return value;
    return new MyPromise((resolve, reject) => {
      reject(value)
    }) 
  }

  static all(lists) {
    return new MyPromise((resolve, reject) => {
      let results = [];
      for(let i = 0; i < lists.length; i++) {
        MyPromise.resolve(lists[i]).then((value) => {
          results[i] = value;
          if(results.length === lists.length) resolve(results);
        }, (error) => {
          reject(error);
        })
      }
    })
  }
  static race(lists) {
    return new MyPromise((resolve, reject) => {
      for(let i = 0; i < lists.length; i++) {
        MyPromise.resolve(lists[i]).then((value) => {
          resolve(value);
        }, (error) => {
          reject(value);
        })
      }
    })
  }
  
  
}



