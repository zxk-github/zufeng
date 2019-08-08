const isFunction = variable => typeof variable === 'function';
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(handle) {
        if(!isFunction(handle)) {
            throw new Error('promise must accept function');
        }
        this._status = PENDING;
        this._value = undefined;
        this._fulfilledQueues = [];
        this._rejectedQueues = [];
        try {
            handle(this._resolve.bind(this), this._reject.bind(this));
        } catch(e) {
            this._reject(e)
        }
    }

    _resolve(result) {
        if(this._status !== PENDING) return; 
        const run = () => {
            this._status = FULFILLED;
            this._value = result;
            let cb ;
            while(cb = this._fulfilledQueues.shift()) {
                cb(result);
            }
        }
        setTimeout(() => run(), 0)
    }

    _reject(reason) {
        if(this._status !== PENDING) return;
        const run = () => {
            this._status = REJECTED;
            this._value = reason;
            let cb;
            while(cb = this._rejectedQueues.shift()) {
                cb(reason)
            }
        }
        setTimeout(() => run(), 0)
    }

    /**
     * then 接受两个参数onFulfilled onRejected，这两个参数都是可选的，
     * onFulfilled onRejected 
     *      1.不是函数的时候，必须被忽略
     *      2.当promise状态为成功的时候，必须被调用，第一个参数是promise成功的时候传入的值(resolve的值)
     *      3.promsie状态变化前不能被调用
     *      4.调用次数只能是一次
     *      5. then方法可以被同一个promise调用多次 成功时按照注册顺序依次调用onFullfiled 失败时按注册顺序依次调用onRejected 
     *  
     * then特性
     * 1. onFulfilled返回一个x
     *      x不为promise 那么就作为新返回的promise对象值传给新的onFulfilled
     *      x为promise, 那么就等这个promise执行，状态变化执行才能向后传递
     * 2. onFulfilled或者onRejected抛出错误，则promise3必须失败
     * 3. 忽略不是函数的onFulfilled onRejected，状态向下级延续
     * */
    then(onFulfilled, onRejected) {
        const {_value, _status} = this;
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装成功时执行的函数
            let fulfilled = value => {
                try {
                    if(!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res = onFulfilled(value);
                        // 如果当前的then返回的是promise 必须等待其状态改变之后再执行下一个回调
                        if(res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                        // 否则直接将结果作为参数，传递给下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }
                } catch(err) {
                    onRejectedNext(err)
                }
            }
            // 封装失败时执行的函数
            let rejected = error => {
                try{
                    if(!isFunction(onRejected)) {
                        onRejectedNext(error);
                    } else {
                        let res = onRejected(error);
                        if(res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后再执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            // 如果不是 直接将结果传递给下一个then回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res);
                        }   
                    }
                } catch(e) {
                    onRejectedNext(e);
                }
            }
            switch(_status) {
                case PENDING: 
                    this._fulfilledQueues.push(fulfilled);
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


/** 
const p1 = new Promise(function (resolve, reject) {
    // ...
});

const p2 = new Promise(function (resolve, reject) {
// ...
resolve(p1);
})

这时候p1的状态决定了p2的状态
*/