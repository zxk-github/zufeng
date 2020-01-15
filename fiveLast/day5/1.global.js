console.log(Object.keys(global))
console.dir(global, {showHidden: true}) // 打印对象的不可枚举属性
console.log(this) // 文件在执行的时候为了实现模块化，外面特意套了一个函数，而且this指向发生了变化，指向module.exports
(function() {
  console.log(this) //这里面的this就指向global
})()
