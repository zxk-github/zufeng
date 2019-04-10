const FlowingReadStream = require('./5.flowingReadStream');

const rs = new FlowingReadStream('./demo1.txt', {
    highWaterMark: 3,
    mode: 0o666,
    start: 3,
    end: 8,
    autoClose: true,
    encoding: 'utf8'
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

/**
 * 流动模式不走缓存
 *  */

