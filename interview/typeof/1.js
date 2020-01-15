// 判断字符串为例
console.log(typeof 'a') // string
console.log(typeof new String('a')) // object
console.log('a' instanceof String) // false
console.log(new String('a') instanceof String) // true

// 验证字符串
function isString(value) {
    return typeof value == 'string' || value instanceof String;
}

console.log({} instanceof Object)
console.log([] instanceof Array)

console.log(typeof String('aa'))  // string
console.log(String('a') === 'a')  // true

// typeof value == 'string' 和 typeof value === 'string'  区别

function isString(value) {
    return value.constructor === String;
}

console.log(isString(String('a')))

/*
1. 我们知道 typeof new String("xxx") 返回 "object"，请问 typeof String("xxx") 返回什么？为什么？

2. 为什么我用的是 typeof obj == "string" 而不是 typeof obj === "string" ？

3. 下面这种写法，有什么不妥？
  function isString(obj) {
    return obj.constructor === String
  }

4. Object.prototype.toString.call(obj) 和 ({}).toString.call(obj) 的区别是什么？哪个好？
*/

function fn() {
    var a = b = 3;
}
console.log(typeof a, b)

var myObject = {
    foo: 'bar',
    func: function() {
        var self = this
        console.log('outer func:  this.foo = ' + this.foo)
        console.log('outer func:  self.foo = ' + self.foo)
        ;(function() {
        console.log('inner func:  this.foo = ' + this.foo)
        console.log('inner func:  self.foo = ' + self.foo)
        })()
    }
}
myObject.func()
// bar bar undefined bar

function foo1() {
    return {
        bar: 'hello'
    }
}

function foo2() {
    return
    {
        bar: 'hello'
    }
}

// NaN isNaN(v) 在进行判断的时候，首选会调用Number()将变量进行转换，


const isNaN = function(value) {
    var n = Number(value);
    return n !== n;
}

// NaN不等于自身

// 实现isInteger(x) 判断x是不是一个整数
function isInteger(x) {
    return parseInt(x, 10) === x;
}


;(function() {
    console.log(1)
    setTimeout(function() {
        console.log(2)
    }, 1000)
    setTimeout(function() {
        console.log(3)
    }, 0)
    console.log(4)
})()


// 判断字符串是不是回文字符串
function isPalindrome(str) {
    return str === [...str].reverse().join('');
}
console.log(isPalindrome('abccba'));

// sun(2, 3)
function sum(...args) {
    return args.reduce((prev, current) => {
        return prev + current;
    })
}
console.log(sum(2, 3))

// sum(2)(3);

function sum(a) {

}

console.log(1 + '2' + '2')    //122
console.log(1 + +'2' + '2')   // 32
console.log(1 + -'1' + '2')   // 02
console.log(+'1' + '1' + '2')  // 112
console.log('A' - 'B' + '2')   // NaN2
console.log('A' - 'B' + 2)    // NaN

console.log(typeof +'2');


console.log('0 || 1 = ' + (0 || 1))  // 1
console.log('1 || 2 = ' + (1 || 2))  // 1
console.log('0 && 1 = ' + (0 && 1))  // 0
console.log('1 && 2 = ' + (1 && 2))  // 2

var a = {},
  b = { key: 'b' },
  c = { key: 'c' },
  d = [1, 2],
  e = function() {},
  f = new String('a');

a[b] = 123
a[c] = 456   
a[e] = 789
a[f] = 098
console.log(a);   // 进行设置key值的时候对象都会被转换为'[object Object]'， 所以会发生覆盖
console.log(a[b])
// 进行字符串的转换的时候 数组会被去初[]，转换为元素组成的字符串 函数会直接转换为函数 对象会被转换为[object Object]

function Foo() {
    getName = function() {  // 根据调用位置 这个是一个作用域的覆盖 不是没有var 会申明到全局上
        console.log(1)
    }
    return this
}
Foo.getName = function() {
    console.log(2)
}
Foo.prototype.getName = function() {
    console.log(3)
}
var getName = function() {
    console.log(4)
}

function getName() {
    console.log(5)
}
//请写出以下输出结果：
Foo.getName()  // 2
getName()  // 4
Foo().getName() // 1
getName() // 1
new Foo.getName() // 2
new Foo().getName() // 3
new new Foo().getName() // 3




// Array.prototype.multiply = function() {
//     const double = this.map(i => i * i);
//     console.log(this.concat(double));
// }
// const a = [1, 2, 3, 4, 5];
// // Implement this
// a.multiply()
// console.log(a) // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]

// console.log(Array.of(100))
