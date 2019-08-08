const Koa = require('koa');

// 默认引入的是application.js
// context.js koa是为了方便使用分装了一个ctx， 里面包含了请求req和响应res
// request 包装了req中的属性和方法
// response 扩展了response 包装了res中的属性和方法

// ctx 集成了req, res, response, request
// req, res原生的 response/request koa中的

// koa共三个方法 app.use app.listen app.on('error')
const app = new Koa(); //创建了一个app实例

app.use((ctx) => {   //中间件
    // 在koa源码中需要创建一个ctx对象 内部封装req和res

    console.log(ctx.req.url) // 原生node中req的请求对象
    console.log(ctx.request.req.url)  // koa ctx.request上分装的有原生的req

    console.log(ctx.request.url) // koa自己封装的  这个和ctx.req.url不是一个东西
    console.log(ctx.url)   // 本质上就是去ctx.request.url上取值 同一个东西
    ctx.body = {name: 123}

    ctx.reponse.body = 'hello'  // 这并不等于res.end()  这俩是一个东西
    ctx.body = 'hello'   // 这个方法仅仅是给ctx.body赋值而已，但是最终依旧是吧结果拿出来用res.end返回
})

app.listen(3000) // 创建一个http服务




