const arr = [1, 2, 3];

console.log(...arr);
// console.log(...{a: 1});
console.log({...{a: 1}, ...{b: 2}})

console.log()
// ...当时一个展开运算符的时候，展开对象必须具有iterator接口

如果仅仅是把一个对象展开到另一个对象里面，这中间根本就不需要迭代的过程，只是相当于解包了，如果希望打印，那就需要遍历每一个值，这个时候就会报iterator错误

...有时候充当的是展开运算符比如console.log(...[1, 2, 3]) // 1,2,3
有时候充当的是剩余运算符比如 [1, ...rest] = [1, 2, 3]
当充当展开运算符的时候，后面的值必须要具有iterator接口
当充当剩余运算符的时候 let [1, ...rest] = [1, 2, 3]  或者 let {x, ...y} = {x: 1, y: 2, z:3} 这个时候是不需要具有iterator的
因为展开运算符展开的过程中会对值进行遍历，所有必须要有iterator，但是剩余运算符不需要进行遍历，仅仅是一个解包取值的过程，所以不需要具有iterator


console.log(...new Set([1,2,3]))