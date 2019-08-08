// const Koa = require('koa');
const Koa = require('./koa/application');

const app = new Koa();

app.use((req, res) => {
    // ctx.body = 'hellow word'
    res.end('1231')
})

app.listen(3002, () => {
    console.log('server start')
});