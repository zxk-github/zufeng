function deepClone(value, hash = new WeakMap()) {
  // 判断是不是 undefined或者null
  if(value == null) {
    return value
  }
  if(value instanceof RegExp) {
    return new RegExp(value);
  }
  if(value instanceof Date) {
    return new Date(value)
  }
  // 如果是函数 或者 简单数据类型 直接返回
  if(typeof value !== 'object') {
    return value;
  }
  if(hash.get(value)) {
    return hash.get(value);
  }
  let obj = new value.constructor();
  hash.set(value, obj);
  Object.keys(value).forEach(key => {
    obj[key] = deepClone(value[key], hash);
  })
  return obj;
  
}
let obj = {a: 1, b: {a: 1}};
let obj1 = deepClone(obj)
obj1.b.a = 200;
console.log(obj1, obj);

let o1 = {};
o1.a = o1;
console.log(deepClone(o1));
// 为了防止这种情况的出现，如果一个对象创建了，那就直接返回

class Person {
  constructor() {

  }
  say() {
    console.log('say')
  }
}

class Man extends Person {
  constructor() {
    super()
  }
}

const man = new Man();

let man1 = deepClone(man);
man1.say()

