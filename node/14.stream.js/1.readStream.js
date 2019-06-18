const fs = require('fs');

const rs = fs.createReadStream('./demo1.txt', {
    highWaterMark: 3
})

rs.on('open', () => {
    console.log('open')
})

rs.on('data', (data) => {
    console.log(data)
})

rs.on('end', () => {
    console.log('end')
})

rs.on('close', () => {
    console.log('close')
})


