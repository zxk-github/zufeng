const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, './a.txt'), {
    mode: 0o666,
    flags: 'r',
    start: 3,
    end: 8,
    encoding: 'utf8'
});

rs.on('readable', function(data) {
    console.log(data)
    console.log(rs.read())
})




