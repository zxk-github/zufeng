let fs = require('fs');

// fs.readFile('./fs2.js', 
//     {
//         encoding: 'UTF8',
//         flag: 'w+'
//     },(err, data) => {
//         console.log(err);
//     console.log(data);
// })
// 需要保存的字符串转成二进制时候要用的
// fs.writeFile('./fs2.js', 'var a = 1', {
//     encoding: 'utf8',
//     flag: 'a',
//     mode: '权限' // 8进制表示
// }, (err,data) => {
//     console.log('1',err, data);
// })

// fs.appendFile('./fs2.js', 'const a = 1', () => {

// })

//文件描述符 file discriptor文件描述符
// 每打开一个文件，操作系统都会给分配一个数字，然后通过数字操作这个文件
// 0 标准输入 1标准输出 2 错误输出
// process.stdin.on('data', function(data) {
//     console.log(data);
// })

// console.log(22)
// process.stdout.write('22');
// process.stderr.write('33');

fs.open('./fs1.js', 'r', (err, fd) => {
    console.log(fd);
    let buf = Buffer.alloc(4);
    // 指定文件读取路径，使用fd
    // 准备写入的buffer
    // 准备写入buffer的偏移量
    // 需要读取文件的字节数 读取多长
    // 开始读取的位置

    // bytesRead实际写入到buffer种成功的字节数
    fs.read(fd, buf, 1, 2, 2, (err, bytesRead, buffer) => { 
        console.log(err, bytesRead, buffer.toString())
    })
})

fs.open('./fs2.js', 'w', (err, fd) => {
    fs.write(fd, ' ', 100, (error, written, string) => {
        console.log(error, written, string);
    })
})


