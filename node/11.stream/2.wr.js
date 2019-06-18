// 可写流 就是往里面写 不会立刻写入文件，而是先写到缓存区，缓存区的大小就是highWaterMark，默认16k，缓存区满了之后才会真正写入硬盘文件中

const fs = require('fs');

const ws = fs.createWriteStream('./demo1.txt', {
    highWaterMark: 3,
    encoding: 'utf8',
    flags: 'w',
    start: 3,  //开始位置不是0，0之前的位置如果没有字节，会成乱码表示
    autoClose: true // 设置为true之后，则在error或者finish事件时文件描述符会自动关闭
})

// 按理说返回了false就不应该写了，但是真的写了数据也不会丢失，会缓存在内存中，缓存区空之后，再从内存中读出

// 当ws.write返回false，即暂存区满了之后，触发drain事件


// 缓存区没满 返回true 满了返回false 
var flag = ws.write('1');
console.log(flag);
var flag = ws.write('2');
console.log(flag);
var flag = ws.write('3');
console.log(flag);
var flag = ws.write('4');
console.log(flag);
var flag = ws.write('5');
console.log(flag);
var flag = ws.write('6');
console.log(flag);
var flag = ws.write('7');
console.log(flag);
var flag = ws.write('8');
console.log(flag);

ws.on('finish', () => {
    console.log('finish')
})

ws.on('drain', () => {
    console.log('drain')
})


