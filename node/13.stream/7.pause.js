const fs = require('fs');

const PauseReadStream = require('./7.pauseReadStream');

const rs = new PauseReadStream('./demo1.txt', {
    highWaterMark: 3
})

// 在实际的情况下, 当可读流出创建之后会立刻进入暂停模式, 其实会立刻填充缓存区
rs.on('readable', () => {
    // 获取当前缓存区大小
    console.log(rs.length);

    let char = rs.read(1);

    // 一旦发现缓存区的字节数小于最高水位线, 则会立刻读取最高水位线个字节
    setTimeout(() => {
        console.log(rs.length);
    }, 200)

})
