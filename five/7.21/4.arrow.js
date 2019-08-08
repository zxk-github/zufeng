// 箭头函数没有this arguments prototype
// 箭头函数没有this， arguments变量 都会按作用域的规则向上级找
var fn = () => {
    console.log()
}

console.log(fn.prototype);  // undefined

// 向箭头函数传值
var fn = (...args) => {
    console.log(args)
}



