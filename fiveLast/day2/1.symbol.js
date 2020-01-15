let s1 = Symbol('a')
let s2 = Symbol('a')
// console.log(Symbol.keyFor(s1)) undefined

// Symbol.for() 如果存在相同的标识，不会被重新申明
let s3 = Symbol.for('a')
let s4 = Symbol.for('a')
console.log(s3 === s4)
// 通过Symbol.for创建的Symbol对象可以通过Symbol.keyFor()获取到对应的标示值
console.log(Symbol.keyFor(s3))   // a

let obj = {
  [s2]: '12',
  [s3]: 'a'
}
console.log(obj[s2])
// 如果属性是Symbol类型的，那么这个key值是不可遍历的
console.log(Object.keys(obj)) // 获取不到
console.log(obj.hasOwnProperty(s2))  // true 可以判断
console.log(Object.getOwnPropertySymbols(obj)) 
