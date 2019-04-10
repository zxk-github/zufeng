const fs = require('fs');

fs.open('./1.txt', 'r+', (err, fd) => {
    console.log(fd)
    const buf = Buffer.from('张新');
    fs.write(fd, buf, 3, 3, null, (err, bytesWritten, buffer) => {
        console.log(err, bytesWritten, buffer)
        fs.write(fd, buf, 0, 3, null, (err, bytesWritten, buffer) => {
            console.log(err, bytesWritten, buffer)
        })
    })
})



