const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, './a.txt'), {
    flags: 'r',
    mode: 0o666,
    start: 0,
    end: 4,
    encoding: 'utf8',
    highWaterMark: 3,
    autoClose: true
})
rs.on('open', ()=> {
    console.log('文件打开')
})

rs.on('data', function(data) {
    console.log(data);
    rs.pause();
    setInterval(function() {
        rs.resume();
    }, 3000)
})


rs.on('end', function() { // 数据在全部被消费掉之后触发 可以切换到流动模式，或者一直调用read()方法
    console.log('end')
})
rs.on('close', function() { //关闭文件， 将不会执行任何的文件操作
    console.log('close')
})
rs.on('error', function(err) {
    console.log(err);
})