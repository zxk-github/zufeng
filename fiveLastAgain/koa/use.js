// const Koa = require('koa');
const Koa = require('./koa1/application');


const app = new Koa();

app.use((ctx, next) => {
  console.log(ctx.req.url);
  console.log(ctx.request.req.url)
  console.log(ctx.request.url);
  console.log(ctx.url);
  console.log(ctx.path);
  next()
  /**
   *  ctx.request.req.url
   *  ctx.req.url  这两个获取的直接就是node本身提供的模块值
   * 
   *  ctx.url
   *  ctx.request.url 这两个都是koa二次分装的
   * 
   *  ctx.response.res.statusCode
   *  ctx.res.statusCode 这两个获取的原生的res值
   * 
   *  ctx.statusCode 
   *  ctx.response.statusCode 这两个获取的是koa二次封装的值
   */
})

let logger = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('logger')
      resolve(1)
    })
  })
}

app.use((ctx, next) => {
  console.log(1);
  ctx.body = '123'
  next();
  console.log(2)
})
// 1 3 5 4 2 logger 6
app.use((ctx, next) => {
  console.log(3);
  next();
  console.log(4)
})
app.use((ctx, next) => {
  console.log(5);
  next();
  console.log(6)
})

app.on('error', (err) => {
  console.log(err);
})

app.listen(4001, () => {
  console.log('server start')
})