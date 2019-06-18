const fs = require('fs');
const path = require('path');

// fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
//     if (err) throw err;
//   });

fs.truncate('./data.txt', 2, () => {
    console.log('截断文件')
})

function rmdir(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stat) => {
            if(err) {
                reject(err);
            }
            if(stat.isDirectory()) {
                console.log(dir);
                fs.readdir(dir, (err, files) => {
                    console.log(files)
                    if(err) {
                        reject(err);
                    }
                    Promise.all(files.map(item => rmdir(path.join(dir,item)))).then(() => {
                        fs.rmdir(dir, resolve);
                    })
                })
            } else {
                fs.unlink(dir, resolve)
            }
        })
    })
}
rmdir('./a').then(() => {
    console.log(11);
});

