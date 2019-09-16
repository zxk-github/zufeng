// const Promise = require('./Promise');


const p = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve(new Promise((resolve) => {
        reject(111)
      }))
  }, 1000)
})
p.then((a) => {
  console.log('ful1')
}, (b)=> {
  console.log('rej1')
}).then(() => {
  console.log('ful2')
}, ()=> {
  console.log('rej2')
})
.then(() => {
  console.log('ful3')
}, ()=> {
  console.log('rej3')
})
