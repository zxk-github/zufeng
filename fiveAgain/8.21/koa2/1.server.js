// const Koa = require('koa');
const Koa = require('./application');

const app = new Koa();

/*
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
*/

function logger() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout')
            resolve(1)
        }, 1000)
    })
}

app.use(async (ctx, next) => {
    console.log(1);
    await next()
    await next()
    console.log(2);
})
app.use(async (ctx, next) => {
    console.log(3);
    await logger();
    next()
    console.log(4);
})
app.use((ctx, next) => {
    console.log(5);
    next()
    console.log(6);
})




app.listen(3002, () => {
    // console.log('server start')
});