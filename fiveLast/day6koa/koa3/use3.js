const Koa = require('koa');

const app = new Koa();

let logger = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('hello')
      resolve()
    }, 1000)
  })
}
// 中间一般都是aysnc await 直接加上，因为不知道后面的中间件是不是存在异步逻辑

// 所有中间件组合成一个大的promise，等着这个promise执行完成之后，返回结果
app.use(async (ctx, next) => {
  console.log(1);
  await next() 
  console.log(2)
  ctx.body = 'hello' // 如果加了await 会等待所有promise执行完毕，浏览器会一直处于loading，如果没有加await, 会直接执行到ctx.body，然后浏览器渲染内容
})

app.use(async (ctx, next) => {
  console.log(3);
  await logger()
  next()
  console.log(4)
})

app.use((ctx, next) => {
  console.log(5);
  next()
  console.log(6)
})

app.listen(4000, () => {
  console.log('server start')
})



new Promise((resolve, reject) => {
  resolve(11);
  console.log(222)
})