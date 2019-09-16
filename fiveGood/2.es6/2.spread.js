// 解构赋值

// 解构相同，可以直接通过相同的结构来取值
let {length} = [1,2,4];
console.log(length);

// 展开运算符 
let [a, ...arg] = [1,3,4,5];
console.log(arg) // [ 3, 4, 5 ]
let {b, ...c } = {a: 1, b: 2, c: 3}
console.log(c); //{ a: 1, c: 3 }

let arr1 = [1,2];
let arr2 = [3,4];
console.log([...arr1, ...arr2])
let obj1 = {a: 1};
let obj2 = {c: 1};
console.log({...obj1, ...obj2})

// 扩展运算符
let arr3 = [1, 2, 3];
console.log(...arr3)   //必须具备iterator接口  string set map array arguments

// Array.from() 和 ...的区别
console.log(Array.from({0: 1, 1: 2, 2: 3, length: 4}))
// console.log(...{0: 1, 1: 2, 2: 3, length: 4}) 报错


// 生成器(Symbol.iterator)函数执行会返回迭代器(generator),默认会不停的调用next()，直到done为true，此时的value会失效

let obj5 = {
    0: 1, 1: 2, [Symbol.iterator]() {
      let i = 0;
      return {
        next() {
          return {value: obj5[i], done: obj5[i++] === undefined}
        }
      }
    }
  }
console.log(...obj5); // [1, 2]


let obj6 = {
  0: 'a', 1: 'b', 
  [Symbol.iterator]: function *() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i++] // {value: xx, done: xx}
    }
  }
}
console.log(...obj6); // [1, 2]


let obj3 = {
  a: 1,
  b: '2',
  c: true,
  d: undefined,
  e: null,
  f: false,
  g: function() {},
  h: [1,'2'],
  i: new Date(),
  j: /a/,
  k: '',
  l: []
}
let obj7 = JSON.parse(JSON.stringify(obj3));
{ a: 1,
  b: '2',
  c: true,
  e: null,
  f: false,
  h: [ 1, '2' ],
  i: '2019-09-02T13:33:32.576Z',
  j: {},
  k: '',
  l: [] }
// 会去除undefined,function,日期对象会被转为字符串，正则会被转换为{}