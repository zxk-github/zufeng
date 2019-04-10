const fs = require('fs');

fs.readFile('./demo1.txt', (err, data) => {
    console.log(data);
})

