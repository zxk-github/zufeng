const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function isFunction(value) {
    return typeof value === 'function';
}

class MyPromise {
    constructor(excutor) {
        this._value = undefined;
        this._status = PENDING;
        this._fulFilledQueues = [];
        this._rejectedQueues = [];
        excutor(this._resolve.bind(this), this._reject.bind(this));
    }   

    _resolve(val) {

        // 处理特殊情况 当resolve的值是一个promise的时候，这时候需要等待promise执行完毕, 
        
        const run = () => {
            if(this._status !== PENDING) return;
            let fulfilled = (value) => {
                let cb;
                while(cb = this._fulFilledQueues.shift()) {
                    cb(value)
                }
            }

            let rejected = (reason) => {
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(reason);
                }
            }
            if(val instanceof MyPromise) {
                val.then((value) => {
                    this._status = FULFILLED;
                    this._value = value;
                    fulfilled(value);
                }, (reason) => {
                    this._status = REJECTED;
                    this._value = reason;
                    rejected(reason);
                });
            } else {
                this._status = FULFILLED;
                this._value = val;
                fulfilled(val);
            }
        }
        setTimeout(run, 0)
    }   

    _reject(reason) {
        if(this._status !== PENDING) return;
        let run = () => {
            this._status = REJECTED;
            this._value = reason;
            let cb;
            while(cb = this._rejectedQueues.shift()) {
                cb(reason);
            }
        }
        setTimeout(run, 0);
        
    }

    then(onFulfilled, onRejected) {
        
        let {_value, _status} = this;
        /**
         * then 特点
            0.then函数返回的是一个promise 支持链式调用
            1. 传入onFulfilled, onRejected如果不是函数直接忽略，
            2. 返回值x
                a. 返回值x如果是promsie对象，必须执行当前这个promise。并且then的状态取决于这个promise, resolve出来的值就是这个then返回的值
                b. 不是promise对象直接传递给下一个then
         *  */

        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            let fulfilled = (val) => {
                try {
                    if(isFunction(onFulfilled)) {
                        let res = onFulfilled(val);
                        if(res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(res);
                        }
                    } else {
                        onFulfilledNext(val);
                    }
                } catch (e) {
                    onRejectedNext(e);
                }
            }

            let rejected = (err) => {
                try {
                    if(isFunction(onRejected)) {
                        let res = onRejected(err);
                        if(res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(res);
                        }
                    } else {
                        onFulfilledNext(err);
                    }
                } catch (e) {
                    onRejectedNext(e);
                }
            }

            switch(_status) {
                case PENDING:
                    this._fulFilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
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
}

module.exports = MyPromise;