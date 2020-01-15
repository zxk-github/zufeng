// const Koa = require('koa');
const Koa = require('./application');

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
  next() // 因为没有添加await，所以不会等待后面异步中间件执行完毕，当前这个中间件就执行完毕了，但是此时ctx.body没有值，于是页面会显示not Found
  console.log(2)  
})

// 如果是return next() 就不会执行下面的代码了

// 还可以在第一个中间件中统计耗时

app.use(async (ctx, next) => {
  console.log(3);
  await logger()
  next()
  next()
  console.log(4)
  ctx.body = 'word'
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