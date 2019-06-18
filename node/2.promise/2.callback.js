// 回调函数中错误无法捕捉
const fs = require('fs');

/*
function read() {
    fs.readFile('./not.txt', 'utf8', (err, data) => {
        if(err) {
            throw Error('error')
            return ;
        }
        console.log(data);
    })
}
try{
    read();
} catch(err) {
    console.log(err);
}
console.log(44);
*/

// 不能return 回调中的内容

/*
function read() {
    let res;
    fs.readFile('./not.txt', 'utf8', (err, data) => {
        if(err) {
            throw Error('error')
            return ;
        }
        console.log(data);
        res = data
    })
    return res;
}
console.log(read());
console.log(111);

*/

/*
// 通过事件发布订阅实现
let EventEmitter = require('events');
let eve = new EventEmitter();
// 这个html对象是存放最终数据
let html = {}; // template data
// 监听数据获取成功事件， 当事件发生之后调用回掉函数
eve.on('ready', function(key, value) {
    html[key] = value;
    if(Object.keys(html).length === 2) {
        console.log(html)
    }
})
setTimeout(function() {
    eve.emit('ready', 'template', 10)
}, 1000)
setTimeout(function() {
    eve.emit('ready', 'data', 20)
}, 2000)

*/

// 通过哨兵函数实现

function render(length, cb) {
    let html = {};
    return function(key, value) {
        html[key] = value;
        if(Object.keys(html).length === length) {
            cb(html)
        }
    }
}
const done = render(2, function(data) {
    console.log(data);
});
setTimeout(function() {
    done('template', 10)
}, 1000)
setTimeout(function() {
    done('data', 20)
}, 2000)