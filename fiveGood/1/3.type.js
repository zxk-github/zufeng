/**
 * 判断类型的几种方式
 * typeof 不能区分数组 对象 null
 * instanceof 会受到原型链的影响, 并且只有对象类型才能用这个判断 1 'a' 不行 1/'a' instanceof Number/String  // false
 * constructor 只有类创建的实例上才会存在这个属性 1/'a'.constructor 会报错 
 * Object.prototype.toString.call 无法区分当前数据构造函数是谁,但是可以区分当前数据属于哪一种浏览器对象类型
 *  */

function Fn() {}
const fn = new Fn();
console.log(Object.prototype.toString.call(fn)); //[object Object]
console.log(Object.prototype.toString.call(1)) // [object Number]
console.log(Object.prototype.toString.call('a')) // [object String]
console.log(Object.prototype.toString.call([])) // [object Array]
console.log(Object.prototype.toString.call(new Date())) // [object Date]
console.log(Object.prototype.toString.call(/a/)) // [object RegExp]
console.log(Object.prototype.toString.call(new Array(1))) // [object Array]
console.log(Object.prototype.toString.call(null)) // [object Null]
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]

function isType(type) {
  return function(content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
  }
}

const util = {};

const types = ['String', 'Number', 'Boolean', 'Date', 'RegExp', 'Null', 'Undefined', 'Array']
for(let i = 0; i < types.length; i++) {
  let type = types[i];
  util[`is${type}`] = isType(type);
}
let flag = util.isString('aa')
console.log(flag);



// 科里化
function fn(a, b, c) {
  return a + b + c;
}


function fn(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}

// 偏函数 
function fn(a, b) {
  return function(c) {
    return a + b + c;
  }
}