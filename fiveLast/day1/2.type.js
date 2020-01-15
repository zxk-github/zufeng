function Fn() {}
let fn = new Fn();
console.log(Object.prototype.toString.call(fn)) // [object Object]
console.log(Object.prototype.toString.call({})) // [object Object]
console.log(Object.prototype.toString.call([])) // [object Array]
console.log(Object.prototype.toString.call('')) // [object String]
console.log(Object.prototype.toString.call(1))  // [object Number]
console.log(Object.prototype.toString.call(true)) // [object Boolean]
console.log(Object.prototype.toString.call(Fn)) // [object Function]
console.log(Object.prototype.toString.call(/a/)) // [object RegExp]
console.log(Object.prototype.toString.call(new Date())) // [object Date]
console.log(Object.prototype.toString.call(new Error())) // [object Error]

function isType(type) {
  return function(content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
  }
}

let util = {};
let types = ['String', 'Number', 'Boolean', 'Object', 'Function', 'RegExp', 'Date', 'Error'];
types.forEach(type => util[`is${type}`] = isType(type) )

var flag = util.isString('a');
console.log(flag)






