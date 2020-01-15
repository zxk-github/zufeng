let s1 = Symbol('a');
let s2 = Symbol('a');
console.log(s1 === s2); // false


let s3 = Symbol.for('c');
let s4 = Symbol.for('c');
console.log(s3 === s4)  // true

console.log(Symbol.keyFor(s1))  // undefined
console.log(Symbol.keyFor(s3))  // c

let obj = {
  [s1]: 1,
  [s3]: 2
}

console.log(obj[s1])   // undefined
console.log(Object.keys(obj))   // [] Symbole类型的key，默认是不可便利的


console.log(typeof s1)   // symbol
console.log(Object.prototype.toString.call(s1)) // [object Symbol]

console.log(Object.getOwnPropertySymbols(obj))  // [ Symbol(a), Symbol(c) ]


// Array.from() 创建数组和...创建数组之间的区别
/// Array.from() 根据类数组的length便利类数组，添加数组项
// ... 使用过for of进行转换，转换的类数组必须具有Symbol.iterator属性

let obj1 = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  '3': 'd',
  length: 2
}
console.log(Array.from(obj1)) // [ 'a', 'b' ] [ 'a', 'b', 'c', 'd', undefined, undefined ]
/*
obj1[Symbol.iterator] = function* () {
  let i = 0;
  while(i < this.length) {
    yield this[i];
    i++;
  }
}
*/
obj1[Symbol.iterator] = function() {
  let i = 0;
  return {
    next() {
      return {value: obj1[i], done: i++ === obj1.length}
    }
  }
}

console.log([...obj1])


 