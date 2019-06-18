const fs = require('fs');

const rs = fs.createReadStream('./demo1.txt', {
    highWaterMark: 3,
    encoding: 'utf8'
});

const ws = fs.createWriteStream('./demo2.txt', {
    highWaterMark: 1,
    encoding: 'utf8'
})

rs.setEncoding('utf8');

rs.on('data', function(data) {
    console.log(data)
    const flag = ws.write(data);
    console.log(flag);
    if(!flag) {
        rs.pause();
    }
})

rs.on('error', (error) => {
    console.log(error)
})

// drain事件: 当可写流缓存区清空之后执行触发这个事件
ws.on('drain', () => {
    console.log('drain');
    rs.resume();
})

rs.on('end', () => {
    ws.end();
})


// rs.pipe(ws);

// ws.on('unpipe', function() {
//     console.log('已经移除可写流管道')
// })

// // 移除目标可写流
// rs.unpipe(ws)



