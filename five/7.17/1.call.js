call
1. 改变当前函数this指向
2. 还会让当前函数执行

fn.call() // 直接让fn执行，并且fn函数中的this就是当前的window, node中值得是global对象
function fn() {
    console.log(this);
}

fn.call('hello')  // this指向hello


// 函数和内部的简单是实现
// Function.prototype.call = function(context) {
//     this();
// }

function fn1() {
    console.log('fn1');
}
function fn2() {
    console.log('fn2');
}

fn1.call.call.call(fn2);
fn1.call 每个函数都有一个call方法，fn1.call依旧是一个函数，所有它上面依旧有一个call方法，所以不管写多少个call，本质上都还是原型上的那个call方法，但是最后一个call(fn2), 让原型上的call方法中的this指向了fn2， fn1.call.call()函数执行，这时候实际上就是fn2执行
由上面可以看出
fn1.call(fn2) 这种只有一个call，原型call函数中this指向call前面的函数，所以call函数执行，函数内部的this就相当于fn1执行
fn1.call.call.call(fn2)  这种多个call的情况最后一个call会将原型上call函数内部的this指向变为fn2, 然后fn1.call.call函数执行，this()执行，就相当于fn2执行，所以多个call，不论有几个，都是fn2执行一次



js中不能直接通过赋值的形式改变this指向，所以 this = window这是一种错误的语法
可以使用Object(arg)将任意类型的数据转换成对象
console.log(Object('aa'))  // [String: aa]
console.log(Object([1,2,3]))    

Function.prototype.call = function(context) {
    context = context? Object(context) : global;
    context.fn = this;
    let args = [];
    for(let i = 1; i < arguments.length; i++) {
        args.push('arguments['+i+']');
    }
    // 利用数组的toString的特性
    let r = eval('context.fn('+args+')');
    delete context.fn;
    return r;
}

Function.prototype.call1 = function(context, ...args) {
    context = context? Object(context) : global;
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.apply = function(context, args) {
    context = context? Object(context) : global;
    context.fn = this;
    let res = context.fn(...args);
    delete context.fn;
    return res;
}


console.log([1,2,3].toString()) // '1,2,3' 数组调用toString()方法，生成值组成的数组
console.log([[[1]], [1], 1].toString())  // '1,1,1' 数组嵌套回去出外壳，元素有对象会转成[object, Object]


bind特性
1. bind方法绑定函数内部this的指向
2. bind方法返回一个函数, 如果绑定之前的原函数需要传参，那么可以在绑定时候传，也可以在使用时候传, 如果原函数存在返回值，那么在绑定之后的函数执行完成之后的返回值就是原函数返回值
3. 如果返回的函数被new了，那么原来函数内部的this指向当前创建的实例, 并且constructor依旧直接是原函数, 如果原函数返回的是一个对象，那么new之后返回的也是一个对象，这个符合new的原则，判断根据原函数的返回值
4. new出来的结果可以找到原有函数类的原型


var obj5 = {
    name: 1
}
function fn5(animal, age) {
    console.log(this)
    console.log(`${this.name}${animal}${age}`)
    return {a: 1};
}
var bindFn = fn5.bind(obj5);
// console.log(bindFn('dog', 678)) //1

var newB = new bindFn();
console.log(newB)


// 思路：类似call，但返回的是函数
Function.prototype.mybind = function (context) {
    let _this = this
    let arg = [...arguments].slice(1)
    return function F() {
        // 处理函数使用new的情况
        if (this instanceof F) {
        return new _this(...arg, ...arguments)
        } else {
        return _this.apply(context, arg.concat(...arguments))
        }
    }
}

const obj6 = {
    name: 2
}
function fn6() {
    console.log(this);
    this.age = 123
    return 1
}
fn6.prototype.say = '12';
const bindFn2 = fn6.mybind(obj6);
// console.log(bindFn2());
const newB2 = new bindFn2();
console.log(newB2.say);
  