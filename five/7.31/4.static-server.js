const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
// console.log(path.join('/a', '/b', 'c', '../d')) // /a/b/d
// console.log(path.resolve('/a', '/b', 'c', '../d')) // /b/d

// console.log(__dirname, __filename, process.cwd())
/**
 * __dirname 当前文件所在的文件夹绝对路径
 * __filename 当前文件的绝对路径
 * process.cwd() 当前服务执行所在的文件夹
 *  */

const server = http.createServer((req, res) => {
    const {pathname} = url.parse(req.url);
    let absPath = path.join(__dirname, pathname);
    fs.stat(absPath, (err, stats) => {
        if(err) {
            res.statusCode = 404;
            return res.end('file or directort is not defined')
        }
        if(stats.isDirectory()) {
            // 如果是文件夹需要找到文件夹下的index.html
            absPath = path.join(absPath, 'index.html');
            fs.access(absPath, (err, data) => {
                if(err) {
                    res.statusCode = 404;
                    return res.end('file or directort is not defined') 
                } 
                res.setHeader('Content-Type', mime.getType(absPath)+';charset=utf-8');
                fs.createReadStream(absPath).pipe(res);
            })
        } else {
            res.setHeader('Content-Type', mime.getType(absPath)+';charset=utf-8');
            fs.createReadStream(absPath).pipe(res);
        }
    })
});

server.listen(5000);



