/**
 * 0. 命名空间
 * 1. 自执行函数
 * 2. require.js AMD
 * 3. sea.js CMD
 * 4. node.js common.js
 * 5. es module
 * 6. umd 全部
 * 
 * 
 * school.js
 * let name = 'zhang';
 * let age = 10;
 * module.exports = {age, name};
 * 
 * useSchool.js
 * (function(exports, require, module, __filename, __dirname) {
 *  let name = 'zhang';
 *  let age = 10;
 *  module.exports = {name, age}
 *  return module.exports;
 * })()
 * 
 * 
 * 
 * 
 *  */

 
 var child = require('./8.moduleChildren');

 console.log(module);
//  {
//     id: '.',   // 当前模块id, 入口模块永远为. 
//     exports: {}, // 导出对象默认是{}
//     parent: null, // 父模块 当前模块被哪个模块引入
//     filename: '/Users/zhangxk/demo/zufeng/node/8.module.js', // 当前文件绝对路径
//     loaded: false, // 模块是否加载完成，当前模块如果执行完毕，就为true
//     children: [ ], // 当前模块引入了哪些模块
//     paths: [ ]  // 当前模块引入第三方模块路径
// }

