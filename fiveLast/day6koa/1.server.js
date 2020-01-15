const koa = require('koa');
// 默认引入的是application.js
// context.js koa里面为了方便， 增加了ctx对象，ctx中包含了req, res的所有属性
// request 扩展了一些req中的属性和方法，让一些获取参数的方式更加简单
// response 包装了res中的属性和方法
// req, res是node原生的一些属性和方法，response/request 都是koa二次分装的一些属性和方法，方便使用
// req, res, request, response上的属性和方法，全部都挂载在ctx上，可以直接通过ctx访问到


// app.use app.listen app.on('error)
