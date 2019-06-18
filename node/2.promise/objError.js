var obj1 = {};
console.log(obj1.then);  //直接通过这种方式获取的时候即使不声明也不会报错

var obj2 = {};
Object.defineProperty(obj2, 'then', {
    get() {
        throw new Error('err');
        return function() {
            console.log(1);
        }
    }
})

console.log(obj2.then)  // 当通过getter函数的时候，这时候会函数内部抛出错误，就会报错

