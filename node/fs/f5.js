const fs = require('fs');
const path = require('path');

// 同步先序遍历

// 异步先序遍历
// function deepSync(dir) {
//     console.log(dir);
//     const files = fs.readdirSync(dir);
//     files.forEach((file) => {
//         let child = path.join(dir, file);
//         let stat = fs.statSync(child);
//         if(stat.isDirectory()) {
//             deepSync(child)
//         } else {
//             console.log(child);
//         }
//     })
// }

// deepSync('a');

// 1 2 3  先序排列
// 2 1 3  中序排列
// 2 3 1  后序排列


function wide(dir) {
    let arr = [dir];
    while(arr.length > 0) {
        const cur = arr.shift();
        console.log(cur)
        let stat = fs.statSync(cur);
        if(stat.isDirectory()) {
            const files = fs.readdirSync(cur).map(file => path.join(cur, file));
            arr = arr.concat(files);
        }
    }
}

wide('a')


console.log(path.resolve('a'));

console.log(__filename)
console.log(__dirname)
