const Koa = require('koa');

const app = new Koa();

// app.use app.on('error') app.listen
app.use((ctx, next) => {
  // ctx.req.url 原生node中req的请求对象
  // ctx.request.req.url 

  // ctx.request.url 访问的koa自定义对象
  // ctx.url  和ctx.request.url是同一个东西

  ctx.body = '123'
})

app.listen(3000, () => {
  console.log('服务启动')
})

