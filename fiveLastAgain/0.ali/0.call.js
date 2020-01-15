Function.prototype.myCall = function(context, ...args) {
  context = context == null? window : Object(context);
  context.fn = this;
  let result = context.fn(...args);
  return result;
}

Function.prototype.myBind = function(context, ...args) {
  context = context == null? window : Object(context);
  let _this = this;
  let Fn = function () {
    if(this instanceof Fn) {
      return new _this(...args, ...arguments);
    } else {
      return _this.apply(context, [...args, ...arguments])
    }
  }
  return Fn;
}

 

function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let result = fn.call(obj, ...args);
  return result instanceof Object? result : obj;
}

