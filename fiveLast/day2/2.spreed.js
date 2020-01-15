// 解构赋值

let {length} = [1,2]
console.log(length)

let [, b, ...c] = [1, 2, 3, 4, 5]
console.log(b, c)

// 对象的展开 一个对象展开放到另一个对象中
let arr1 = [1, 2]
let arr2 = [3, 4]
let arr = [...arr1, ...arr2];

let obj1 = {a: 1}
let obj2 = {b: 2}
console.log({...obj1, ...obj2})

// 剩余运算符 只能用在最后一项，有收敛功能，剩下的内容重新组装
let [, e, ...f] = [1, 2, 3, 4, 5]
let {name, ...age} = {name: 1, age: 2, grade: 3}
console.log(name, age)


// 将值转为数组两种方式Array.from  ...展开运算符将类数组展开放进去
function fn() {
  console.log(...arguments)
  // console.log(...{'0': 1, '1': 2, '2': 3}) // 提示必须具备Symbol.iterator属性， 因为...是通过迭代器来进行使用的
  console.log(...[1,2,3])
  console.log(Array.from({'0': 1, '1': 2, '2': 3}))   // []  因为Array.from()会根据length属性的值进行遍历存放进一个数组中
}
fn(1, 2, 3)


let obj = {'0': 0, '1': 1, '2': 2, length: 3}
obj[Symbol.iterator] = function() {
  let i = 0
  return {
    next() {
      return {value: obj[i], done: ++i > obj.length }
    }
  }
} 
console.log(...obj)

let obj1 = {'0': 0, '1': 1, '2': 2, length: 3}
obj1[Symbol.iterator] = function* (){ 
  let i = 0;
  while(i < this.length) {
    yield this[i++];
  }
}
console.log(...obj1);



