const fs = require('fs');
const BUFFER_SIZE = 3;


function copy(src, target) {
    fs.open(src, 'r', (err, readFd) => {
        fs.open(target, 'w', (err, writeFd) => {
            let buf = Buffer.alloc(BUFFER_SIZE);
            !function next() {
                fs.read(readFd, buf, 0, BUFFER_SIZE, null, (err, bytesRead, buffer) => {
                    console.log(err, bytesRead, buffer)
                    if(bytesRead > 0) {
                        fs.write(writeFd, buffer, 0, bytesRead, null, next);
                    }
                })
            }()
        })
    })
}
copy('./1.txt', './2.txt');