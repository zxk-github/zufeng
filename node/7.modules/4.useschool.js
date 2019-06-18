var school = require('./2.school');

// 找到模块
// 读取模块内容
// 把模块内容封装在一个函数内部立刻执行
// 把module.exports对象赋值给使用的变量
console.log('4', school.a)
school.a.d = 4444;

!function(exports, require, module, __filename, __dirname) {
    let a = 1;  // 引入模块代码
    module.exports = a;
    return module.export;  //在使用模块中 school就等于module.exports
}

// 在每个模块中打印module都是不一样的 它代表当前模块
// console.log(module);