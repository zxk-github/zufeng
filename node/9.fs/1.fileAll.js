const fs = require('fs');

// 读取文件
fs.readFile('./data.txt', {encoding: 'utf8', flag: 'r'}, function(err, data) {
    if(err) {
        return err;
    }
    console.log(data);
})

// 写入文件
fs.writeFile('./data.txt', '宋', {encoding: 'utf8', flag: 'a'}, (err, data) => {
    if(err) {
        return err;
    }
    console.log(data)
})


fs.appendFile('./data.txt', '儿子', {encoding: 'utf8'}, (err, data) => {
    console.log(data);
})

fs.open('./data.txt', 'r', '0x666', (err, fd) => {
    // fd文件描述符 操作系统分配
    const buf = Buffer.alloc(3);
    fs.read(fd, buf, 1, 2, 1, (err, byteRead, buffer) => {
        console.log(byteRead, buffer);
    })
})

fs.open('./data.txt', 'r', '0x666', (err, fd) => {

    // 需要写入内容的buffer
    // 准备写入内容的buffer的偏移量
    // length 读取的长度 
    // position 被写入文件中
    //bytesWritten 实际写入字节数
    // buf 写进去了什么
    fs.write(fd, Buffer.from('张张'), offset, length, position, (bytesWritten, buf) => {

    } )
})