// 文件操作 fs.readFile fs.writeFile fs.open fs.read fs.write fs.appendFile fs.unlink
// 文件夹操作 fs.readdir fs.rmdir fs.mkdir 
// 判断操作 fs.stat fs.access

const fs = require('fs')
let pathUrl = 'c/b/c/d/e';
const path = require('path');  
//同步创建
function mkdir0(pathUrl) {
    const pathArr = pathUrl.split('/');
    // let dirname = '';
    // let current = '';
    // while( current = pathArr.shift()) {
    //     dirname += ('/'+current);
    //     try {
    //         fs.accessSync(path.join(__dirname, dirname));
    //     } catch (e) {
    //         fs.mkdirSync(path.join(__dirname, dirname));
    //     }
    // }
    let dirname = '';
    function next(i) {
        if(i === pathArr.length) return; 
        dirname += ('/'+pathArr[i]);
        try {
            fs.accessSync(path.join(__dirname, dirname));
        } catch (e) {
            fs.mkdirSync(path.join(__dirname, dirname));
        }
        next(i + 1);
    }
    next(0)
}
mkdir0(pathUrl)

let pathUrl2 = 'a/b/c/d/e';

function mkdir1(pathUrl,cb) {
    const dirArr = pathUrl.split('/');
    let dirname = '';
    function next(i) {
        if(i === dirArr.length) return cb(); 
        dirname += ('/'+dirArr[i]);
        fs.access(path.join(__dirname, dirname), function(err, data)  {
            if(err) {
                fs.mkdir(path.join(__dirname, dirname), function(err, data) {
                    if(err) {
                        throw err;
                    }
                    next(i+1);
                })
            }
        })
    }
    next(0)
}
mkdir1(pathUrl2, () => {    
    console.log('创建完毕')
})

const {access, mkdir } = require('fs').promises;

let pathUrl3 = 'b/b/c/d/e';
function mkdir2(pathUrl, cb) {
    const pathArr = pathUrl.split('/');
    let dirname = '';
    async function next(i) {
        if(i === pathArr.length) return cb(); 
        dirname += ('/'+pathArr[i]);
        try{
            await access(path.join(__dirname, dirname));
        }catch(e) {
            await mkdir(path.join(__dirname, dirname));
            await next(i+1);
        }
    }
    next(0);
}
mkdir2(pathUrl3, () => {
    console.log('创建完毕')
})
