// 流是一种有起点和终点的数据传输手段
// 可读流：不会关注文件全体本身，只会关注读取文件，以及读取之后，如何处理

var fs = require('fs');

var rs = fs.createReadStream('./1.txt', {
    highWaterMark: 3,
    flags: 'r',
    mode: 0x666,
    encoding: 'utf8',
    start: 3,
    end:8
});

// 文件流 还会有打开和关闭
rs.on('open', function() {
    console.log('文件已经打开');
})
// 监听data事件
// 当开始监听data事件的时候， 流就开始读取文件内容，缓存区满了之后就发射数据缓存区数据，然后清空缓存区， 然后继续读取文件触发data事件，循环进行直到结束

// 缓存区就是一小块内存，读取内存中数据，要
rs.on('data', function(data) {
    console.log(data);
    rs.pause() // 暂停读取和发射data事件
    setTimeout(() => {
        rs.resume()// 恢复读取并触发data事件
    }, 2000)
})

// 文件内容读取完了，触发end事件
rs.on('end', function() {
    console.log('读取完毕')
})

rs.on('error', function() {
    console.log('error')
})

rs.on('close', function() {
    console.log('文件已经关闭')
})


