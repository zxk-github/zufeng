Array.from() // 可以将两种东西转换为数组，一类是类数组。一类是具有iterator接口的对象 
// Array.from 转换数组的原则就是根据length的值，循环然后放进数组中
// ... 是通过迭代器的方式便利创建数组

console.log([...new Set([1,2,3,4,1])])

function *fn () {
    yield 1;
    yield 2;
    // return 3;
}
const it = fn();
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())

function arr() {
    const arrLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        'length': 3,
        [Symbol.iterator]() {
            let i = 0;
            return {
                next() {
                    return {value: arrLike[i], done: i++ === arrLike.length}
                }
            }
        }

    }
    console.log(...arrLike);
}
arr();

console.log(JSON.parse(JSON.stringify({a: 1, f: [1], c: null, d: undefined, e: function() {}})))
console.log(JSON.parse(JSON.stringify({a: 1, d: [1], g: /\d+/, f: function() {}})))
