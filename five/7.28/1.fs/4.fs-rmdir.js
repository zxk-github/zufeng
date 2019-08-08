const fs = require('fs');
const path = require('path');

function rmdir1(filePath) {
    const stats = fs.statSync(filePath);
    if(stats.isDirectory()) {
        let dirs = fs.readdirSync(filePath);
        dirs = dirs.map((dir) => path.join(filePath, dir));
        dirs.forEach(dir => {
            rmdir1(dir)
        });
        console.log(filePath);
        fs.rmdirSync(filePath);
    } else {
        fs.unlinkSync(filePath);
    }
}
// rmdir1(path.join(__dirname, 'b'))

// 异步深度先序  series
function rmdir2(filePath, cb) {
    fs.stat(filePath, (err, stats) => {
        if(stats.isDirectory()) {
            fs.readdir(filePath, (err, dirs) => {
                dirs = dirs.map((dir) => path.join(filePath, dir));
                function next(i) {
                    if(i === dirs.length) return fs.rmdir(filePath, cb)
                    rmdir2(dirs[i], () => next(i+1));
                }
                next(0)
            })
        } else {
            fs.unlink(filePath, cb);
        }
    })
}
// rmdir2(path.join(__dirname, 'b'), () => {
//     console.log('删除完毕')
// });

// 深度先序 并发删除 paralle
function rmdir3(filePath, cb) {
    fs.stat(filePath, (err, stats) => {
        if(stats.isDirectory()) {
            fs.readdir(filePath, (err, dirs) => {
                dirs = dirs.map((dir) => {
                    return path.join(filePath, dir);
                })
                if(dirs.length === 0) {
                    fs.rmdir(filePath, cb)
                }
                let index = 0;
                function done (){
                    if(++index === dirs.length) {
                        return fs.rmdir(filePath, cb);
                    }
                }
                dirs.forEach(dir => {
                    rmdir3(dir, done);
                })
            })
        } else {
            fs.unlink(filePath, cb)
        }
    })
}
// rmdir3(path.join(__dirname, 'b'), () => {
//     console.log('删除成功')
// });


function rmdir4(filePath) {
    
}

rmdir4(path.resolve(__dirname, 'b'));

