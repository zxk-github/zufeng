function co(gen) {
    let it = gen();  // 生成器持续执行
    return new Promise(function(resolve, reject) {
        !function next(prevValue) {
            let {value, done} = it.next(prevValue);
            if(done) {
                resolve(value);
            } else {
                value.then(next, reject)
            }
        }()
    })
}

// 返回的是一个promise
