let context = {}
// context就做了一件事，代理response和request上的属性

/*
context.__defineGetter__('path', function() {
    // 当使用ctx.path进行获取path的时候，这里的this指向ctx, 所以可以通过ctx.request.path 获取导到值
    // 然后ctx的原型链是context, 所以就能通过ctx.path访问到这里面来
    return this.request.path;
})
*/

function defineGetter(property, key) {
    context.__defineGetter__(key, function() {
        return this[property][key];
    })
}
function defineSetter(property, key) {
    context.__defineSetter__(key, function(value) {
        this[property][key];
    })
}

defineGetter('request', 'path');
defineGetter('request', 'url');

defineGetter('response', 'body');  // ctx.body本质上是去ctx.response.body取
// 但是在进行ctx.body = 123;赋值的时候，本质上应该赋值给ctx.response.body
defineSetter('response', 'body');



// 因为使用了this.context = Object.create(context) 所以这里面的context变量并不是默认的ctx

module.exports = context;


// Object.__defineGetter__ 定义获取器

// let obj = {}

// obj.__defineGetter__('a',  function() {
//     return 1;
// }) 
// console.log(obj.a)

/*

// 这种形式也行
 Object.defineProperty(o, 'a', {
    get(val) {
        return val
    }
})
 Object.defineProperty(o, 'a', {
    set(val) {
        console.log(val)
    }
})
*/