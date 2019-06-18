// 深度优先+先序遍历

let path = require('path');
let fs = require('fs');
function preDeep(dir, cb) {
    fs.readdir(dir, (err, files) => {  // a/b  a/c
        ( function next(i) {
            if(i >= files.length) return cb();
            let child = path.join(dir, files[i]); 
            fs.stat(child, (err, stat) => {
                if(stat.isDirectory()) {
                    preDeep(child, () => next(i+1));
                } else {
                    console.log(child);
                    next(i+1);
                }
            })
        }) (0)
    })
}
preDeep('a', () => {
    console.log('全部迭代完毕')
})




