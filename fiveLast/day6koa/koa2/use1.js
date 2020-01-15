// const Koa = require('koa');
const Koa = require('./application')

const app = new Koa();

app.use((ctx) => {
  console.log(ctx.req.url) 
  console.log(ctx.request.req.url)
  // console.log(ctx.response.req.url)
  
  //-----上面获取的都是原生的node req属性 下面是koa二次分装的
  console.log(ctx.request.url)
  console.log(ctx.url) 
  
  ctx.response.boy = '123'
  ctx.body = '123'  //这个方法只是给ctx.body赋值而已。并不是直接调用res.end
})

app.listen(4000, (req, res) => {
  console.log('server start')
})

