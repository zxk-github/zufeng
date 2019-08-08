// file system 文件相关的操作都使用fs模块

const fs  = require('fs');
const path = require('path');
// path options callback
fs.readFile(path.resolve(__dirname, 'a.txt'), {encoding: 'utf8', flags: 'r'}, function(err, data) {
    // path data options callback
    fs.writeFile(path.resolve(__dirname, 'b.txt'), data, {encoding: 'utf8', flags: 'a', mode: 0o666}, function(err) {
        if(err) {
            console.log(err);
        }
    })
})




