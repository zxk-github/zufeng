let Promise = require('./promise');

let p = new Promise((resolve, reject) => {
  resolve(1);
})

p.then((data) => {
  console.log(data)
})



