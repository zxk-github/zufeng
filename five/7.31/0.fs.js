const fs = require('fs');
const path = require('path');

fs.stat(path.join(__dirname, '2.server.js'), (err, data) => {
    console.log(data.isFile());
})

