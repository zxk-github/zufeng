const fs = require('fs');

// 可写流就是向文件中写入东西，不会立即写入，而是会创建一个缓存区，把文件写入到缓存区中，缓存区满了之后才会写到文件中

// 缓存去默认大小是16k
const ws = fs.createWriteStream('./demo1.txt', {
    flags: 'w',
    mode: 0x666,
    encoding: 'utf8',
    highWaterMark: 3
})


// 超出的部分将保存在内存中，不会丢失，没有超出的本质上保存在buffer中
// 如果缓存区没有满返回true, 缓存区满了返回false
var flags = ws.write('1');
console.log(flags)
var flags = ws.write('1');
console.log(flags)
var flags = ws.write('1');
console.log(flags)
var flags = ws.write('1');
console.log(flags)






