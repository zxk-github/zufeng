const http = require('http');

const server = http.createServer();

// 对于serve端来说 请求是一个可读流 响应是一个可写流
server.on('request', (req, res) => {
    let arr = [];
    req.on('data', function(chunk) {
        arr.push(chunk);
    }) 
    req.on('end', function() {
        if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            r = Buffer.concat(arr).toString();
            console.log(r);
            // res.write(r)
            res.end(r);
        }
    })

})

server.listen(3004);
