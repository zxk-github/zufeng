const fs = require('fs');

const BUFFER_SIZE = 3;
fs.open('./data.txt', 'r', 0o666, function(err, readFd) {
    fs.open('./data2.txt', 'w', 0o666, function(err, writeFd) {
        let buf = Buffer.alloc(BUFFER_SIZE);
        !function next() {
            fs.read(readFd, buf, 0, BUFFER_SIZE, null, function(err, byteBuffer, readBuf) {
                if(err) {
                    console.log(err);
                    return err;
                }
                console.log('22', writeFd);
                if(byteBuffer > 0) {
                    console.log('22', writeFd);
                    fs.write(writeFd, readBuf, 0, byteBuffer, null, function() {
                        next();
                    })
                }
            })
        }()
    })
})
// fs.open('./data2.txt', 'w', 0o666, function(err, writeFd) {
//     console.log(writeFd)
// })