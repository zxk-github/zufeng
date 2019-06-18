const FlowingReadStream = require('./6.flowingReadStreamPipe');
const WriteStream = require('./4.writeStream');


const rs = new FlowingReadStream('./demo1.txt', {
    highWaterMark: 3,
    mode: 0o666,
    start: 3,
    end: 8,
    autoClose: true,
    encoding: 'utf8'
})

const ws = new WriteStream('./demo2.txt', {
    highWaterMark: 3,
    flags: 'w+'
})

rs.pipe(ws);
