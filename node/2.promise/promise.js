const myPromise = require('./4.myPromise')
new myPromise(function(resolve, reject) {
    // 异步走pengding
    // setTimeout(function() {
    //     resolve(1)
    // }, 1000)

    // 同步走fulfilled
    
}).then(function(value) {
    value++
    console.log(value);
})
// .then的值只要不是函数 都会把前面的值传下去