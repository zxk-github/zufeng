// 将一个可读流变成流动模式
// 流动模式不缓存，直接发射，然后读取下一次数据，如果使用了流动模式，而且没有消费，数据就白白流失了

/**
 * 1. 监听data事件
 * 2. 调用rs.resume()
 * 3. 调用rs.pipe()将数据发送给writable
 * 
 *  */

const fs = require('fs');

const rsf = fs.createReadStream('./demo.txt', {
    highWaterMark: 3
});

rsf.on('data', function(data) {
    console.log(data)
})

rsf.on('end', function() {
    console.log('文件读取完毕')
})









