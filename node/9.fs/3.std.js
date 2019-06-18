// 输入和输出都对应一个文件描述符，它是一个数字
console.log('aa') // 标准输出
console.error('ccc') // 错误输出

// 监听输入，打印出来对应的值
process.stdin.on('data', (data) => {
    console.log(data);
})

const fs = require('fs');
// 0 标准输入 1 标准输出 2 错误输出
fs.write(1, Buffer.from('a'), 0, 1, null, function(err, bytesWritten) {
    console.log(bytesWritten);
})





