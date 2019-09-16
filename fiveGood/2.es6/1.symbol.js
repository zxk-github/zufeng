let s1 = Symbol(1);
let s2 = Symbol(1);
console.log(s1 === s2);

let obj = {};
obj[s2] = 1;  
console.log(obj); 

// 对象的Symbol类型的属性是不可枚举的，但是可以通过Object.getOwnPropertySymbols(obj)来获取对象的所有Symbol类型的key
for(let name in obj) {
  console.log(name);
}
console.log(Object.getOwnPropertySymbols(obj));  // 获取所有Symbol类型的key值

//Symbol.for(str) 当字符串相等的时候，不会重新创建一个Symbol对象，而是会返回原来的，所以当使用Symbol.for(str)创建一个Symbol对象的时候，str相同，值就相同
const s3 = Symbol.for('aaa');
const s4 = Symbol.for('aaa');
console.log(s3 === s4)
console.log(Symbol.keyFor(s3)) //获取创建Symbol的key值

// Symbol具备愿原编程的功能，可以用于改变默认系统级的方法



