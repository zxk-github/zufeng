let {length} = []
console.log(length);

let [,...a] = [1, 2, 3]
console.log(a)

console.log(Array.from({0: 1, 1: 1,length: 1})) // []  
Array.from() // 会根据length的长度，进行循环，然后拿到对应长度的数值，放到数组中
console.log() // ...是利用的迭代器来实现创建数组
  
// 自定义实现一个迭代器

function arr() {
    const arrLike = {0: 'a', 1: 'b', 2: 'c', length: 3, [Symbol.iterator]() {
        let i = 0;
        return {
            next() {
                return {value: arrLike[i], done: i++ === arrLike.length }
            }
        }
    }};
    console.log([...arrLike])
}
const arrLike = {0: 'a', 1: 'b', 2: 'c', length: 3, [Symbol.iterator]: function* () {
    let i = 0;
    while(this.length !== i) {
        yield this[i++]; 
    }
}};

console.log([...arrLike])

JSON.parse(JSON.stringify(obj))  // 不是json就会被移除

// 浅拷贝  undefined 函数 会被直接忽略 正则会转成{}
console.log(JSON.parse(JSON.stringify({a: 1, b: undefined, c: null, d: new Date, f: [1], g: /\d+/, f: function() {}})))






