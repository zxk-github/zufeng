function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let result = fn.apply(obj,args);
  return typeof result === 'object' && result !== null ? result : obj;
}

function Fn(name) {
  this.name = name;
}
const fn = myNew(Fn, '张');
