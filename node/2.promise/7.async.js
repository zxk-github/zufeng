// async/await语法糖 generator+promise语法糖
// await 后面的异步必须是一个promise 
async function read() {
    let a = await readFile();
    console.log(a);
    let b = await readFile();
    console.log(b);
}



// 自己实现
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

function read() {
    return co(function *() {
        let a = yield readFile();
        console.log(a);
        let b = yield readFile();
        console.log(b);
    })
}







