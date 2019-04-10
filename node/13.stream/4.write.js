const fs = require('fs');
let writeStream = require('./4.writeStream');

// const ws = fs.createWriteStream('./demo1.txt', {
//     flags: 'w',
//     highWaterMark: 3,
//     mode: 0o666,
//     start: 0,
//     encoding: 'utf8',
//     autoClose: true // 当流写完之后自动关闭
// })

const ws = new writeStream('./demo1.txt', {
    flags: 'w',
    highWaterMark: 3,
    mode: 0o666,
    start: 0,
    encoding: 'utf8',
    autoClose: true // 当流写完之后自动关闭
})

let n = 9;

function write() {
    let flag = true;
    while(flag && n >0) {
        flag = ws.write(n + '');
        console.log(flag);
        n--;
    }
    ws.once('drain', () => {
        console.log('drain');
        write();
    })
}

write();
