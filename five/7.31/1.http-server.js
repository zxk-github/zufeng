const http = require('http');
const url = require('url'); // url的解析使用url模块

// const server = http.createServer((req, res) => {
//     // ...
// })  这种方式和下面的监听requst事件的方式一样
const server = http.createServer();

/*
const test = 'http://jw:1234@www.baidu.com:8000/path/detail?a=1&b=2#123';
const myUrl = new url.URL(test);
console.log(myUrl);
console.log(url.parse(test, true))  // protocol auth host port hash path(带参数) pathname search query href 
*/

// _http_server.js server.emit('request', req, res);
// const res = new server[kServerResponse](req) req,res一个东西解析出来的两个东西

server.on('request', (req, res) => {
    // req 是一个 http.incomingMessage类 是一个可读流
    // res 是一个 http.ServerResponce类 是一个可写流

    // 请求行
    const method = req.method; // 请求的方法 大些的
    const version = req.httpVersion;
    const uri = req.url;   //请求路径 (port之后，hash之前)可以获取到pathname和query参数不能获取到hash
    // const {protocol, host, hostname, port, path, pathname, query, search, href} = new url.URL(url)
    const {protocol, host, hostname, port, path, pathname, query, search, href} = url.parse(uri);
    console.log(method, version, uri);  // GET 1.1 /path/a?a=1&b=2
    console.log(protocol, host, hostname, port, path, pathname, query, search, href);

    // 请求头
    console.log(req.headers); // 获取所有请求行信息
    console.log(req.headers['user-agent']) // 所有的请求头key值是小写的

    // 如果是post请求，会存在请求体
    let arr = [];
    req.on('data', function(data) {  // req继承了可读流 
        // 读取请求体中的数据
        arr.push(data);
    })
    req.on('end', function() {  // 没有数据也会触发end事件
        console.log(Buffer.from(arr).toString());
    })

    /***********相应相关**************/
    res.statusCode = 404; //设置状态码
    res.setHeader('Content-type', 'text/plain;charset=utf-8')
    res.setHeader('a', '1')
    res.write('hello') // res是一个可写流
    res.end('word') // end不调用请求不结束

})

let port = 3000;
server.listen(port, () => {  // 服务启动之后 调用监听函数
    console.log('localhost:'+port)
})

server.on('error', (err) => {
    if(err.code === 'EADDRINUSE') {
        server.listen(++port);
    }
})
/**
 * 
 * http.createServer()会返回一个server类的实例
 * request 事件 每次接受到请求的时候，都会触发request事件，keep-alive的情况下，一个链接可能有多个请求
 *  */

 /**
  * url的解析可以使用url模块
  * 
  *  */



