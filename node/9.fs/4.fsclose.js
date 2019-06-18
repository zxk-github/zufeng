const fs = require('fs');

fs.open('./data.txt', 'w', '0o666', function(err, fd)     {
    fs.write(fd, Buffer.from('a'), 0, 1, null, function(err, bytesWrite) {
        // 强行把缓存区的数据写入文件，并且关闭
        fs.fsync(fd, () => {
            fs.close(fd, () => {
                console.log('关闭')
            })
        })
    })
})



