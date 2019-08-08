// call实现

Function.prototype.call1 = function(context, ...args) {
    context = context ? Object(context) : global;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}
/**
 * call
 * 1. 改变当前函数的this指向
 * 2. 让当前函数执行
 *  */

function fn() {
    console.log(this)
}

//fn.call() // 函数执行，函数内部this指向window / global
fn.call1('hello')

function fn1() {
    console.log('fn1'); 
    console.log(this);
}
function fn2() {
    console.log('fn2');
}

// fn1.call(fn2);  // fn1内部的this指向fn2
fn1.call.call(fn2)  // 1. fn1.call内部的this指向fn2, fn1.call函数执行的时候，实际上就相当于fn2执行

Function.prototype.apply = function(context, args = []) {
    context = context ? Object(context) : global;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

//Object(arg) 可以将任意数据类型转换成对象
console.log(Object([1, 2,3]))

/**
 * bind
 * 1. bind函数改变的是原来函数的this指向
 * 2. bind函数返回一个新的函数，如果绑定之前原函数需要传参，可以在绑定的时候传，也可以返回的函数执行的时候传入，如果原函数存在返回值，绑定之后函数的返回值也是原来函数的返回值
 * 3. 如果返回的函数被new了，因为new的优先级最高，所以函数内部的this会指向新创建的实例，并且constructor依旧是原来的函数，可以使用原函数的原型链，返回值遵循new的规则
 *  
 * */


Function.prototype.bind1 = function(context, ...args) {
    const _this = this;
    return function F(...fArgs) {
        // 处理函数使用new的情况
        if(this instanceof F) {
            return new _this(...args, ...fArgs);
        } else {
            return _this.apply(context, args.concat(fArgs));
        }
    }
}




Function.prototype.bind2 = function(context, ...args) {
    const _this = this;
    return function F(...fArgs) {
        if(this instanceof F) {
            return new _this(...args, ...fArgs);
        } else {
            return _this.apply(context, args.concat(fArgs));

        }
    }
}

function f1(a, b) {

}
const f2 = f1.call(obj, 1 ,2)
f2();

