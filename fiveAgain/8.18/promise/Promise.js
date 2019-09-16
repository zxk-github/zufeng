// promsie 有三个状态，只能是pending --> fulfilled  pending --> rejected
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function isFunction(value) {
  return typeof value === 'function';
}
class Promise {
  constructor(excutor) {
    this._value = undefined;
    this._status = PENDING;
    this._resolveTasks = [];
    this._rejectTasks = [];
    excutor(this._resolve.bind(this), this._reject.bind(this));
  }

  _resolve(val) {
    if(this._status !== PENDING ) return;
    let run = () => {
      
      let runFulfilled = (value) => {
        let cb;
        while(cb = this._resolveTasks.shift()) {
          cb(value)
        }
      }

      let runRejected = (error) => {
        let cb;
        while(cb = this._rejectTasks.shift()) {
          cb(error);
        }
      }

      if(val instanceof Promise) {
        val.then((value) => {
          this._status = FULFILLED;
          this._value = value;
          runFulfilled(value);
        }, (err) => {
          this._value = err;
          this._status = REJECTED;
          runRejected(err);
        })
      } else {
        this._status = FULFILLED;
        this._value = val;
        runFulfilled(val);
      }
    }
    setTimeout(run, 0)
  }
  
  _reject(error) {
    if(this._status !== PENDING) return;
    let run = () => {
      let cb;
      this._status = REJECTED;
      this._value = error;
      while(cb = this._rejectTasks.shift()) {
        cb(error);
      }
    }
    setTimeout(run, 0);    
  }

  then(onFulfilled, onRejected) {
    const {_value, _status} = this;
    /**
     * then的特性
     * 0. 如果调用的promise是pending状态，那就会将执行函数放进一个队列中等待执行
     * 1. 调用then的promise状态决定调用哪一个参数，状态不改变不会进行onFulfilled, onRejected的执行，resolve或者reject出来的值就是这两个参数的值，并且只能被调用一次
     * 2. onFulfilled, onRejectted的返回值x
     *  x 如果是promise对象，那就等待x执行完成，并且x的成功或者失败决定then返回对象的状态
     *  x 不是promise对象，回作为参数传递给下一个promise,状态也会向下传递
     * 3. then返回的是一个Promsie对象
     *  */
    return new Promise((onFulfilledNext, onRejectedNext) => {
      let fulfilled = value => {
        try {
          if(!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            const res = onFulfilled(value);
            if(res instanceof Promise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(value)
            }
          }
        } catch(e) {
          onRejectedNext(e);
        }
      } 
      let rejected = error => {
        try {
          if(!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            const res = onRejected(error);
            if(res instanceof Promise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(res);
            }
          }
        } catch(e) {
          onRejectedNext(e);
        }
      }

      switch(_status) {
        case PENDING:
          this._resolveTasks.push(fulfilled);
          this._rejectTasks.push(rejected);
          break;
        case FULFILLED:
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    })

  }
  
  // catch相当于只是传入一个reject
  catch(rejected) {
    this.then(undefined, rejected);
  }

  static resolve(val) {
    if(val instanceof Promise) return val;
    return new Promise((resolve) => {
      resolve(val);
    })
  }

  static reject(val) {
    return new Promise((resolve, reject) => {
      reject(val);
    })
  }

  static all(list) {
    return new Promise((resolve, reject) => {
      // 返回值集合
      let value = [];
      let count = 0;
      for(let [i, p] of list.entries()) {
        this.resolve(p).then(res => {
          value[i] = res;
          count++
          // 等所有结果都是成功就是成功
          if(count === list.length) {
            resolve(value);
          }
        }, err => {
          // 有一个失败就是失败
          reject(err)
        })
      }
    })
  } 

  static race(list) {
    return new Promise((resolve, reject) => {
      for(let p of list) {
        this.resolve(p).then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
      }
    })
  }
  finally(cb) { // 不论promise状态如何都会执行finally内部的回调函数
    // finally()传入的回调函数不接受任何参数，这意味着没有办法知道，前面的promise状态到底是fulfilled还是rejected
    // 这意味着finally方法里面的操作应该是与状态无关的，不依赖promise的执行结果
    return this.then((value) => {
      Promise.resolve(cb()).then(() => value)
    }, (error) => {
      Promise.resolve(cb()).then(() => {throw error} )
    })
  }

}

module.exports = Promise;