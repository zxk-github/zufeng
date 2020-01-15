function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  fn.call(obj, ...args);
  return obj;
}

function fn(name, age) {
  this.name = name;
  this.age = age;
}
let obj = myNew(fn, 'z', 10);
console.log(obj.constructor === fn)
console.log(obj)

let obj2 = new fn('z', 10);
console.log(obj2.constructor === fn)


Function.prototype.myCall = function(context, ...args) {
  context = context == null? window: Object(context);
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myApply = function(context, args=[]) {
  context = context == null? window: Object(context);
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myBind = function(context, ...args) {
  context = context == null ? window: Object(context);
  let _this = this;
  let Fn = function() {
    if(this instanceof Fn) {
      return new _this(...args, ...arguments);
    } else {
      return this.call(context, ...args, ...arguments);
    }
  }
  
  return Fn

}

let fn2 = fn.bind(obj, '1');
let result = fn2('12')




