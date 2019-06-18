const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function MyPromise(executor) {
    let self = this;   // 缓存当前promise实例
    self.status = PENDING; // 初始化状态
    self.onResolvedCallbacks = []; // 定义存放成功的回掉的数组
    self.onRejectedCallbacks = []; // 定义存放失败的回掉的数组
    
    // 当调用此方法的时候，如果promise状态为pending的话，需要转为成功态，如果不是则什么也不做
    function resolve(value) {

        if(value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(function() {
            if(self.status === PENDING) {  // 如果是初始状态则变为成功态
                self.status = FULFILLED;
                self.value = value; // 保存成功的值，并且值不能改变
                // 调用所有成功的回调
                self.onResolvedCallbacks.forEach(cb => {
                    cb(self.value)
                });
            }
        })
        
    }

    function reject(reason) {
        setTimeout(function() {
            if(self.status === PENDING) {
                self.status = REJECTED;
                self.value = reason;  // 失败的原因给了value
                self.onRejectedCallbacks.forEach(cb => {
                    cb(self.value)
                });
            }
        })
        
    }

    executor(resolve, reject);
}

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x ) {
        return reject(new Error('循环引用'))
    }
    let called = false;
    if(x instanceof MyPromise) {
        if(x.status === PENDING) {
            x.then(function(y) {
                resolvePromise(promise2, y, resolve, reject)
            }, reject)
        } else {
            x.then(resolve, reject)
        }

    // x 是一个thenable对象或者函数, 只要有then属性的对象
    } else if(x != null && (typeof x === 'object' || typeof x === 'function')) {
        try{ 
            let then = x.then;
            if(typeof then === 'function') {
                // 防止有些promise会同时执行成功和失败函数
                then.call(x, function(y) {
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, function(e) {
                    if(called) return;
                    called = true;
                    reject(e);
                })
            } else {
                // 到此的话，x不是一个thenable对象，那直接把它当成值resolve promise2就可以了
                resolve(x)
            }
        } catch(e) {
            if(called) return;
            called = true;
            reject(e)
        }
    } else {
        // 如果x是一个普通的值，则用x的值去resolve promise2
        resolve(x)
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const self = this;
    // 如果成功和失败的会调没有传，则表示这个then没有任何逻辑，只会把值向后抛
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled: value => value;
    onRejected = typeof onRejected === 'function' ? onRejected: reason => {throw reason };
    if(self.status === FULFILLED) {
        return promise2 = new MyPromise(function(resolve, reject) {
            // 如果获取到返回值X，会走解析promise的过程 
            // x 因为是别人写的 可能是一个promise 可能是一个其他任意值
            setTimeout(function() {
                try{ 
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    // 如果执行失败，就把promise2改为失败态
                    reject(e);
                }
            })
            
        })
        
    }
    if(self.status === REJECTED) {
        console.log('b');
        return promise2 = new MyPromise(function(resolve, reject){ 
            setTimeout(function() {
                try{ 
                    let x = onRejected(self.value);
                    resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e);
                }
            })
        })
        
    }
    if(self.status === PENDING) {
        console.log('c');
        return promise2 = new MyPromise(function(resolve, reject){ 
            self.onResolvedCallbacks.push(function() {
                try{
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e);
                }
            })
            self.onRejectedCallbacks.push(function() {
                try{
                    let x = onRejected(self.value);
                    resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            })
        })
    
    }
    
}

// catch就是只传入一个失败的毁掉函数
MyPromise.prototype.catch = function(onReject) {
    this.then(null, onReject);
}

MyPromise.deferred = MyPromise.defer = function() {
    let defer = {};
    defer.promise = new MyPromise(function(resolve, reject) {
        defer.resolve = resolve;
        defer.reject = reject;
    })
    return defer;
}

/**
 * Promise.all 会接收一个promise数组，如果promsie全部变为fulfilled才会成功，否则失败, 在执行的过程中，如果有变成失败的，那就立即执行reject,不会等待全部执行完毕
 * Promise.race 只要有一个改变了状态，那状态就立即改变，改变的是成功就成功，是失败就失败 
 */

function gen(times, cb) {
    let result = [], count = 0;
    return function(i, data) {
        result[i] = data;
        if(++count == times) {
            cb(count);
        }
    }

}

MyPromise.all = function(promises) {
    return new MyPromise(function(resolve, reject) {
        let result = [];
        const done = gen(promises.length, resolve);
        for(let i = 0; i < promises.length; i++) {
            promises[i].then(function(data) {
                done(i, data);
            }, reject)  
        }
    })
}

MyPromise.race = function(promises) {
    return new MyPromise(function(resolve, reject) {
        for(let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)  
        }
    })
}

MyPromise.resolve = function(value) {
    return new MyPromise(function(resolve) {
        resolve(value);
    })
}

MyPromisec.reject = function(reason) {
    return new MyPromise(function(resolve, reject) {
        reject(reason);
    })
}


module.exports = MyPromise;