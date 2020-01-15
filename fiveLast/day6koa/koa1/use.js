// const Koa = require('koa');
const Koa = require('./application')

const app = new Koa();

app.use((req, res) => {
  res.end('hello')
})

app.listen(4000, (req, res) => {
  console.log('server start')
})

