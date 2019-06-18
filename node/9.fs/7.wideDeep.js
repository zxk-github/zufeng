let fs = require('fs');
let path = require('path');

function wideDeep(dir) {
    let arr = [dir];
    while(arr.length > 0) {
        let current = arr.shift(); // 取出最左边的
        console.log(current);
        let stat = fs.statSync(current);
        if(stat.isDirectory()) {
            let files = fs.readdirSync(current);
            files.forEach((item) => {
                arr.push(path.join(current, item));
            })
        }
    }
} 
wideDeep('a'); 


