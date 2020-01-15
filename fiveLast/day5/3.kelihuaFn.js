// 函数柯里化

function add(a, b, c, d) {
  return a + b + c + d;
}

function curring(fn, args = []) {
  let len = fn.length
  return (..._) => {
    args.push(..._);
    // fn.length 返回的值当前函数形参的个数
    if(args.length < len) {
      return curring(fn, args);
    }
    return fn(...args);
  }
} 

const sum = curring(add)(1,2)(3)(4) 
// 思路: 先将值保存起来，数量够了，然后再执行add函数
console.log(sum)


const isType = (type, content) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`;
}
// 可以预置参数
const isString = curring(isType)('String')
console.log(isString('12'))


// 柯里化的反函数
const add = a => b => c => d => {
  return a + b + c + d;
}
function unCurrying(fn) {
  return (...args) => {
    args.forEach(item => {
      fn = fn(item);
    })  
    return fn;
  }
}
let r = unCurrying(add)(1, 2, 3, 4);
console.log(r)


// 反柯里化: 扩大函数的使用范围
let check = Object.prototype.toString.call(1)

function unCurrying(fn) {
  return (...args) => {
    return fn.call(...args)
  }
}
let checkType = unCurrying(Object.prototype.toString)
console.log(checkType(1))



// call实现
Function.prototype.call = function(context, ...args) {
  context = context == null ? window : Object(context);
  context.fn = this;
  let result =  context.fn(...args);
  delete context.fn;
  return result;
}


// -------------------
Function.prototype.unCurrying = function() {
  return (...args) => {
    // return Function.prototype.call.apply(this, args);
    return this.call(...args);
  }
}


let checkType = Object.prototype.toString.unCurrying();
console.log(checkType(1))