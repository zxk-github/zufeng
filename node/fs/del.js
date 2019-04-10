const fs = require('fs');
const path = require('path');

function rmdirSync(dir) {
    let files = fs.readdirSync(dir);
    files.forEach(item => {
        const cPath = path.join(dir, item);
        let child = fs.statSync(cPath);
        if(child.isDirectory()) {
            rmdirSync(cPath);
        } else {
            fs.unlinkSync(path.join(dir, item));
        }
    })
    fs.rmdirSync(dir);
}
rmdirSync()

function rmdirAsync(dir) {
    return new Promsie((resolve, reject) => {
        fs.stat(dir, (err, stat) => {
            if(stat.isDirectory()) {
                fs.readdir(dir, (err, files) => {
                    if(err) return reject(err);
                    Promise.all(files.map(item => rmdirAsync(path.join(dir, item)))).then(() => {
                        fs.rmdir(dir, resolve)
                    }) 
                })
            } else {
                fs.unlink(dir, resolve);
            }
        })
    })
}




















