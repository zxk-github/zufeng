function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype);
    let res = fn.apply(obj, args);
    return res instanceof Object ? res :  obj;
}

function Fn(args) {
    this.name = 12;
}
Fn.prototype.say = '123';
const o = myNew(Fn);
console.log(o);