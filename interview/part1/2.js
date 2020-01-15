var fs = require('fs');
var path = require('path');

function preDeep(dir, callback) {
    console.log('11', dir);
    fs.readdir(dir, (err, files) => {
        !function next(i) {
            if(i >= files.length) return callback();
            let child = path.join(dir, files[i]);
            fs.stat(child, (err, stat) => {
                if(stat.isDirectory()) {
                    preDeep(child, () =>  next(i+1));
                } else {
                    console.log(child);
                    next(i+1)
                }
            })
        }(0)   
    })
}

preDeep('a', () => {
    console.log('全部完毕')
})
