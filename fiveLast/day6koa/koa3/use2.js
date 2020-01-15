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
app.use((ctx, next) => {
  console.log(1);
  next()
  console.log(2)
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