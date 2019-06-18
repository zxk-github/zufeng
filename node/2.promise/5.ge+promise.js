const fs = require('fs');

function readFile(filepath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filepath, 'utf8', function(err, data) {
            err ? reject(err) : resolve(data)
        })
    })
}

function* gen () {
    let a = yield readFile('1.txt');
    console.log(a);
    let b = yield readFile('2.txt');
    let c = yield readFile('3.txt');
}

let it = gen();
let r1 = it.next();
console.log(r1);    
r1.value.then((data) => {
    let r2 = it.next(data);
    r2.value.then((data) => {
        let r3 = it.next(data);
        r3.value.then((data) => {
            console.log(data);
        })
    })

})

// co 帮助自动执行迭代器的





