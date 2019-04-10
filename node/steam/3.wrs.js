let fs = require('fs');

let rs = fs.createReadStream('./1.txt', {
    highWaterMark: 3
})

let ws = fs.createWriteStream('./2.txt', {
    highWaterMark: 3
})

// 监听可读流data事件的时候会触发会调函数的执行
// 可以实现数据的生产者和消费者速度的均衡

// tcp http 网络层
rs.on('data', function(data) {
    console.log(data);
    let flag = ws.write(data);
    if(!flag) {
        rs.pause();
    } 
})

// 监听可写流缓存区清空事件，当所有要写入的数据写入完成之后,接着恢复从可读流里读取，并触发data事件

ws.on('drain', function() {
    console.log('drain');
    rs.resume();
})

