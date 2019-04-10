// 暂停模式
// 当监听readable事件的时候，可读流会马上向底层读取文件，

const fs = require('fs');

const rp = fs.createReadStream('./demo.txt', {
    highWaterMark: 2
})

//self.read(0) 只会填充缓存区，不会发射data事件, 但是会发射readable事件
rp.on('readable', () => {
    console.log(rp._readableState.length);
    // read不加参数，读取缓存区所有内容
    // read(1) 读取一个字节，如果可读流发现你要读取的字节小于等于缓存区字节大小，则直接返回

    let ch = rp.read(1);
    console.log(ch)
    setTimeout(() => {
        // 当你读完指定的字节后，如果可读流发现剩下的字节已经比最高水位线小了，则会立马再次读取填满，哪怕高过最高水位线
        console.log(rp._readableState.length); //3
    },200)
})

// buffer是一个链表 缓存区
// length 缓存区大小



