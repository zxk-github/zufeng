Function.prototype.myCall = function (context, ...args) {
  context = context == null ? window : Object(context);
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
var name = 1;
function fn() {
  console.log(this.name);
}
fn.myCall();


Function.prototype.myApply = function(context, args = []) {
  context = context == null ? window : Object(context);
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
}
var name = 1;
function fn() {
  console.log(this.name);
}
fn.myApply()



Function.prototype.myBind =  function(context, ...args) {
  context = context == null ? window : Object(context);
  let _this = this;
  return function F() {
    if(this instanceof F) {
      return new _this(...args, ...arguments);
    } else {
      return _this.apply(context, [...args, ...arguments]);
    }
  }
}

Function.prototype.myBind = function(context, ...args) {
  context = context == null ? window : Object(context);
  const _this = this;
  return function F() {
    if(this instanceof F) {
      return new _this(...args, ...arguments);
    } else {
      return _this.apply(context, [...args, ...arguments]);
    }
  }
}


function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, ...args);
  return typeof result === 'object' && result !== null  ? result : obj;
}

var name = 1;
function fn3() {
  console.log(this.name);
}

var f = fn3.bind(undefined)
f()


