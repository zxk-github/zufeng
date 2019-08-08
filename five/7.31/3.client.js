const http = require('http');


// http.get() 只能发送get请求
// 对于client来说 请求是一个可写流 响应是一个可读流
const client = http.request({
    hostname: 'localhost',
    port: 3004,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'post'
}, function(res) {  // 此时响应res是一个可读流
    console.log(res.statusCode)
    console.log(res.headers)
    res.on('data', (chunk) => {
        console.log(chunk.toString());
    })
    res.on('end', () => {
        console.log('返回值读取完毕')
    })
})

// 写入需要发送的
client.write('啊啊啊啊') // client 请求是一个可写流，用来添加请求体/请求参数
client.end(); // 

