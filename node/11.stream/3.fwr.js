const fs = require('fs');

const rs = fs.createReadStream('./demo1.txt', {
    highWaterMark: 3
});

const ws = fs.createWriteStream('./demo2.txt', {
    highWaterMark: 2
})


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

ws.on('drain', () => {
    console.log('drain');
    rs.resume();
})


// rs.pipe(ws);

// ws.on('unpipe', function() {
//     console.log('已经移除可写流管道')
// })

// // 移除目标可写流
// rs.unpipe(ws)



