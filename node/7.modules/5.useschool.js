// var school = require('./3.useschool');
// var school = require('./4.useschool');
// console.log(Object.keys(require.cache))

new Promise((resolve,reject) => {
    console.log(11)
    resolve(1);
}).then(() => {
    console.log(333);
})

process.nextTick(() => {
    console.log(2);
}) 






