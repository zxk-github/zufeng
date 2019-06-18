const fs = require('fs');

const rs = fs.createReadStream('./demo1.txt');
const ws = fs.createWriteStream('./demo2.txt');

rs.pipe(ws);

