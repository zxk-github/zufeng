// 生成器是一个函数，可以用来生成迭代器
// 普通函数一旦调用就不会停止，生成器函数可以暂停

// 生成器函数
function* gen() {
    console.log(11);

    // 这一行实现了输入和输出
    let b = yield 'a';
    
    console.log(22);
    console.log(b)
    let c = yield b;

    console.log(33);
    let d = yield c;

    return d;
}
// 生成器函数和普通函数不一样，调用的时候函数不会立即执行
// 生成器函数会返回一个迭代器。迭代器是一个对象，每次调用next方法，就可以返回一个值的对象
const it = gen();
let r1 = it.next();
console.log(r1); 
it.next('大B')

