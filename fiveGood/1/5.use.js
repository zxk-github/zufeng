const fs = require('fs').promises;
const path = require('path');
function *read() {
  try{
    let content = yield fs.readFile(path.join(__dirname, 'name.txt'), 'utf8');
    let age = yield fs.readFile(path.join(__dirname, content), 'utf8');
    return age;
  } catch(e) {
    console.log(e);
  }
}

/*
const it = read();
// console.log(it.next());

let {value, done} = it.next();
value.then((data) => {
  let {value, done} = it.next(data);
  value.then((data) => {
    console.log(data);
  })
}, (err) => {
  it.throw(err)
})
*/

function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let {value, done} = it.next(data);
      if(!done) {
        Promise.resolve(value).then((data) => {
          next(data);
        }).catch((err) => {
          reject(err);
        })
      } else {
        resolve(value);
      }
    }
    next();
  })
}
let it = read()
co(it).then((data) => {
  console.log(1, data);
}, error => {
  it.throw(error);
})

