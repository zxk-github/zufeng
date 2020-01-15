const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

app.use((ctx, next) => {
  console.log(1);
  next()
  console.log(2)
})

app.use((ctx, next) => {
  console.log(3);
  next()
  console.log(4)
})

app.use((ctx, next) => {
  console.log(5);
  next()
  console.log(6)
})

app.use((ctx, next) => {
  ctx.body = {a: 1}
  // ctx.body = fs.createReadStream('./request.js')
})


app.listen(4000, () => {
  console.log('server start')
})