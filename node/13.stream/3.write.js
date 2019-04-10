const fs = require('fs');

const ws = fs.createWriteStream('./demo1.txt', {
    highWaterMark: 3
})

let n = 9;
function write() {
    let flag = true;
    while(flag && n > 0 ) {
        flag = ws.write(n+'');
        n= n - 1;
        console.log(flag);
    }
    ws.once('drain', () => {
        console.log('drain');
        write();
    })
}
write()




