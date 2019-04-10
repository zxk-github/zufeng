const fs = require('fs');

//创建一个可读流，
// 读取数据的流 对于流来说，他不关心文件本身，只关心能不能获取到数据，以及获取到文件之后如何处理

// 监听他的data事件，当你一旦开始监听data事件的时候，流就可以读取文件内容并且发射data
// 不是把文件整体读取然后发射出来。而是设置一个64K的缓存区，读满之后发射一次

let rs = fs.createReadStream('./demo.txt', {
    highWaterMark: 3 // 缓存去大小
})

// 开始监听data事件，开始读取文件，每次读取到设置字节都会触发一次data事件
// 默认情况下，监听了data事件之后会不停的读取数据。读满之后触发data事件这个过程不会暂停

rs.on('data', (data) => {
    
    console.log(data);
    // 流的暂停触发机制 
    rs.pause() // 暂停读取和发射data事件

    setTimeout(() => {
        rs.resume() // 恢复 读取 并触发data事件
    }, 200)
})

// 读取结束之后触发end事件
rs.on('end', () => {
    console.log('结束了')
})

// 错误会触发error事件
rs.on('error', () => {
    console.log('出错了')
})

// 如果是文件流还会有open/close 打开关闭事件
rs.on('open', () => {
    console.log('打开')
})

rs.on('close', () => {
    console.log('关闭')
})







