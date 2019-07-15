const fs = require('fs');
function promisify(module) {
    return function(...arg) {
        return new Promise((resolve, reject) => {
            module(...arg, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

let readFile1 = promisify(fs.readFile)

async function readFile() {
    const f1 = await readFile1('1.txt', 'utf8');
    console.log(f1);

}

readFile()

