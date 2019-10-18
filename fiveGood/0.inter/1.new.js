function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let result = fn.apply(obj,args);
  console.log(result instanceof Object)
  return result instanceof Object ? result : obj;
}

function Fn(name) {
  this.name = name;
  return Object(1);
}
// const fn = myNew(Fn, '张');
const fn = myNew(Fn, 1) ;
console.log(fn)
