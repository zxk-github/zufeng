const fs = require('fs');

// 当你往可写流里写数据的时候，不会立刻写入文件磁盘，而是先写入缓存区，缓存区大小由highWaterMark限制 默认16K
// 缓存区满了之后，才能真正的写到磁盘中
const ws = fs.createWriteStream('./demo.txt', {
    highWaterMark: 3
})

// 缓存区未满 返回true, 满了返回false
let flag = ws.write('1');
console.log(flag)
flag = ws.write('2');
console.log(flag)
flag = ws.write('3');
console.log(flag)
flag = ws.write('4');
console.log(flag)
// 超出部分没有丢失会放到内存中，只是没有放到缓存区，缓存区清空之后会自动放进来









