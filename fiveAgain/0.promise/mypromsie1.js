const PENDING = 'pending';
const FUIFILLED = 'fulfilled';
const REJECTED = 'rejected';
function isFunction(value) {
    return typeof value === 'function';
}

class MyPromise {
    constructor(executor) {
        this._value = '';
        this._status = PENDING;
        this._fulfilledQueues = [];
        this._rejectedQueues = [];
        executor(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(value) {
        if(this._status !== PENDING) return;

        // 当resolve/reject在被调用的时候，我们依次提取成功或者失败任务队列中的函数，并执行，清空队列，从而实现then的多次调用
        const run = () => {
            /*
            this._value = value;
            this._status = FUIFILLED;
            let cb;
            while(cb = this._fulfilledQueues.shift()) {
                cb(value);
            }
            */

            // 特殊情况处理 当resolve(value) value是一个promsie的时候，必须先执行这个promise, 当前promise状态取决于这个promise 
            
            // 因为value参数也可能会出现then多级的现象，所以需要执行此时value的任务队列
            
            // 依次执行成功队列中的函数 并清空队列
            const runFulfilled = result => {
                let cb;
                while(cb = this._fulfilledQueues.shift()) {
                    cb(result)
                }
            }

            // 依次执行失败队列中函数，并清空队列
            const runRejected = error => {
                let cb;
                while(cb = this._rejectedQueues.shift()) {
                    cb(error);
                }
            }
            // 如果value参数是promise类型 必须等待这个promise执行完成，当前promise状态取决于这个promsie的执行状态
            if(value instanceof Promise) {
                value.then((val) => {
                    this._value = val;
                    this._status = FUIFILLED;
                    runFulfilled(val);
                }, (err) => {
                    this._value = err;
                    this._status = REJECTED;
                    runRejected(err);
                })
            } else {
                this._value = value;
                this._status = FUIFILLED;
                runFulfilled(value);
            }
        }
        setTimeout(run, 0)
    }

    _reject(error) {
        if(this._status !== PENDING) return;        
        const run = () => {
            this._status = REJECTED;
            this._value = error;
            let cb;
            while(cb = this._rejectedQueues.shift()) {
                cb(error);
            }
        }
        setTimeout(run, 0)
        
    }

    then(onFulfilled, onRejected) {
        const {_value, _status} = this;
        /*
        调用then方法的promise 
            如果是resolve那值就传递给onFulfilled
            如果是reject那值就传递给onRejected
        then 特性 
         1. onFulfilled onRejected不是函数, 直接忽略
         2. onFulfilled onRejected执行返回x
            如果x是promsie 执行promise,状态就取决于这个promsie的状态
            如果x不是promise 直接传递给下一个then
        */
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            let fulfilled = value => {
                try {
                    if(!isFunction(onFulfilled)) {
                        onFulfilledNext(value);
                    } else {
                        let res = onFulfilled(value);
                        if(res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(res);
                        }
                    }
                } catch(e) {
                    onRejectedNext(e)
                }
            }

            let rejected = error => {
                try {
                    if(!isFunction(onRejected)) {
                        onRejectedNext(error);
                    } else {
                        let res = onRejected(error);
                        if(res instanceof MyPromise) {
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
                    console.log(111)
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case FUIFILLED:
                    console.log(222)
                    fulfilled(_value);
                    break;
                case REJECTED: 
                    console.log(333)
                    rejected(_value);
                    break;
            }


        })
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    static resolve(value) {
        if(value instanceof MyPromise) return value;
        return new MyPromise((resolve) => resolve(value))
    }

    static reject(err) {
        return new MyPromise((resolve, reject) => reject(err));
    }

    static all(list) {
        return new MyPromise((resolve, reject) => {
            let count = 0;
            let values = [];
            for([i, p] of list.entries()) {
                this.resolve(p),then((value) => {
                    count++;
                    values[i] = value;
                    if(count === list.length) {
                        resolve(values);
                    }
                }, (err) => {
                    reject(err);
                })
            }
        })
    }

    static race(list) {
        return new MyPromise((resolve, reject) => {
            for(let [i, p] of list.entries()) {
                this.resolve(p).then((value) => {
                    resolve(value)
                }, (err) => {
                    reject(err)
                })
            }
        })
    }

    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            error => MyPromise.resolve(cb()).then(() => {throw new Error(error)})
        )
    }
}
module.exports = MyPromise;