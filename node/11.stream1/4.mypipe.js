const fs = require('fs');

const rs = fs.createReadStream('./demo1.txt', {
    highWaterMark: 1
});
const ws = fs.createWriteStream('./demo2.txt', {
    highWaterMark: 2
});

rs.on('open', () => {
    console.log('文件已经打开')
})

rs.on('data', (data) => {
    const flags = ws.write(data);  // flags为true 缓存区没有满， 可以继续写入
    console.log(flags);
    if(!flags) {
        rs.pause();
        console.log('暂停了')
    }
})

ws.on('drain', () => { // 缓存区清空了，会触发drain事件
    console.log('重新开始')
    rs.resume();
}) 