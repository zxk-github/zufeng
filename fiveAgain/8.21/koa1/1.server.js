// const Koa = require('koa');
const Koa = require('./application');

const app = new Koa();

app.use((ctx) => {
    // 直接访问的是原生模块
    console.log(ctx.req.url)  
    console.log(ctx.request.req.url)

    console.log(ctx.request.url)
    console.log(ctx.url);
    console.log(ctx.request.req.path) // 因为原生模块上不存在req.path 所以undefined
    
    console.log(ctx.request.path)
    console.log(ctx.path) // 这两个就能访问到 因为ctx.request ctx访问的是二次封装的模块

    ctx.body = '232'
})

app.listen(3002, () => {
    // console.log('server start')
});