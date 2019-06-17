const fs = require('fs');

const fr = fs.createReadStream('./demo1.txt', {
    flags: 'r',
    mode: 0x666,
    highWaterMark: 3,
    encoding: 'utf8',
    start: 1,
    end: 5
})

fr.on('open', () => {
    console.log('文件已经打开');
})

// 当监听到data事件时候，文件开始读取，每次读满缓存区，都会触发一次data事件，
fr.on('data', (data) => {
    console.log(data)
    fr.pause(); // 暂停读取
    setTimeout(() => {
        fr.resume(); // 从新开始读取文件
    }, 300)
})

// 为了防止文件读取过程中，出现缓存区满格现象，这是时候应该设置流的暂停和重启操作

fr.on('end', () => {
    console.log('文件读取结束')
})

fr.on('close', () => {
    console.log('文件已经关闭')
})
