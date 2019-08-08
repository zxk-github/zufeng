const Koa = require('./koa/application');

const app = new Koa();

// app.use((req, res) => {
//     res.end('123')
// })
app.use((ctx) => {
    console.log(ctx.req.url) // 原生node中req的请求对象
    console.log(ctx.request.req.url)  // koa ctx.request上分装的有原生的req

    console.log(ctx.request.url) // koa自己封装的  这个和ctx.req.url不是一个东西
    console.log(ctx.url)
    // res.end('123')

    ctx.reponse.body = 'hello'  // 这并不等于res.end()
    ctx.body = 'hello'   // 这个方法仅仅是给ctx.body赋值而已，但是最终依旧是吧结果拿出来用res.end返回
})

app.listen(4000, ()=> {
    console.log('server start')
})