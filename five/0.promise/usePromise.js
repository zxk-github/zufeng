// const Promise = require('./2.promise');


const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(1)
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




