const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function isFunction(value) {
    return typeof value === 'function';
}

class MyPromise {
    constructor(excutor) {
        this._status = PENDING;
        this._value = undefined;
        this._resolveQueues = [];
        this._rejectQueues = [];

        excutor(this._resolve.bind(this), this._reject.bind(this))
    }

    _resolve(val) {
        if(this._status !== PENDING) return; 
        
        // 特殊情况 如果val是promise对象 那么需要等待这个promsie执行完成 并且他的状态决定后面then的状态，值也会向下传递
        const run = () => {

            // val是promise的时候，也会注入执行栈 所以需要执行栈
            let runFulfilled = (value) => {
                let cb;
                while(cb = this._resolveQueues.shift()) {
                    cb(value)
                }
            }

            let runRejected = (reason) => {
                let cb;
                while (cb = this._rejectQueues.shift()) {
                    cb(reason);
                }
            }

            if(val instanceof MyPromise) {
                val.then((value) => {
                    this._status = FULFILLED;
                    this.value = value;
                    runFulfilled(value);
                }, (reason) => {
                    this._status = REJECTED;
                    this.value = reason;
                    runRejected(reason);
                })
            } else {
                this._status = FULFILLED;
                this.value = val;
                runFulfilled(val)
            }
        }
        setTimeout(run, 0)
    }

    _reject(err) {
        if(this._status !== PENDING) return;
        const run = () => {
            this._status = REJECTED;
            this._value = err;
            let cb;
            while(cb = this._rejectQueues.shift()) {
                cb(err)
            }  
        }
        setTimeout(run, 0)
    }

    then(onFullfiled, onRejected) {

        /**
         * 特点
         * 1.返回promise对象
         * 2.调用then的promise成功，执行onFullfiled,失败，执行onRejected
         * 3.onFullfiled/onRejected 不是函数，则忽略，状态向下传递 
         * 4.then的返回值x
         *    x 是promsie，必须等待x执行完毕，状态取决执行完成之后的值
         *    x 不是promise, 当作下一个then onFulfiled的参数向下传递
         *  */

        return new Promsie((onFullfiledNext, onRejectedNext) => {
            const { _value, _status } = this;
            const fulFilled = (value) => {
                try {
                    if(isFunction) {
                        let res = onFullfiled(value);
                        if(res instanceof MyPromise) {
                            res.then(onFullfiledNext, onRejectedNext);
                        } else {
                            onFullfiledNext(res);
                        }
                    } else {
                        onFullfiledNext(value);
                    }
                } catch(e) {
                    onRejectedNext(e);
                }
            }

            const rejected = (reason) => {
                try {
                    if(isFunction(onRejected)) {
                        res = onRejected(reason);
                        if(res instanceof MyPromise) {
                            res.then(onFullfiledNext, onRejectedNext);
                        } else {
                            onFullfiledNext(reason);
                        }
                    } else {
                        onRejectedNext(reason);
                    }
                } catch(e) {
                    onRejectedNext(e);
                }
            }

            switch(_status) {
                case PENDING: 
                    this._resolveQueues.push(fulFilled);
                    this._rejectQueues.push(rejected);
                    break;
                case FULFILLED:
                    fulFilled(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }

        })


    }



}









