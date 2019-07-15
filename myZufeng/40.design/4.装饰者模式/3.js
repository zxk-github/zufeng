// AOP 面向切面编程 在函数执行之前或者之后添加一些额外的逻辑，而不需要修改函数的逻辑
// 可以通过预编译方式和运行期动态代理实现在不修改源代码的情况下给程序动态统一添加功能的一种技术
// 函数执行之前，函数执行之后，动态加入一些逻辑，函数本身不变

Function.prototype.before = function(beforeFn) {
    let _this = this;
    return function() {
        // beforeFn.apply(this, arguments);
        // _this.apply(this, arguments);
        beforeFn(...arguments);
        _this(...arguments);
    }
}

Function.prototype.after = function(afterFn) {
    let _this = this;
    return function() {
        _this.apply(this, arguments);
        afterFn.apply(this, arguments);
    }
}

function buy(money, goods) {
    console.log(`花${money}买${goods}`)
}

buy = buy.before(function() {
    console.log(`申请1块钱`)
})

buy = buy.after(function() {
    console.log(`归还2毛钱`)
})

buy = buy(0.8, '盐')





