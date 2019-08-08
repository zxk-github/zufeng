// 使用流来读取写入文件
const fs = require('fs');
const path = require('path');
// fs.open fs.read fs.write fs.close

// path flags mode callback
fs.open(path.resolve(__dirname, './a.txt'), 'r', '0o666', (err, frd) => {
    fs.open(path.resolve(__dirname, './b.txt'), 'w', '0o666', (err, fwd) => {
        console.log()
        // fd buffer offset length position
        // fs.read(fd, buffer, offset, length, position, callback)
        // fs.write(fd, buffer, offet, length, position, callback)
        const length = 3;
        const buffer = Buffer.alloc(length);
        function next(index) {
            fs.read(frd, buffer, 0, 3, index, function(err, bufferBytes, buf) {
                fs.write(fwd, buf, 0, bufferBytes, index, function(err, bytesWritten, bufWrite) {
                    if(bufferBytes === length) {
                        next(index+bufferBytes);
                    }
                })
            })
        }
        next(0);
    })
})


