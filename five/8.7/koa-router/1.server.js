const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({prefix: '/user'});
router.get('/hello', (ctx, next) => {
    ctx.body = 'hello'
    next();
    
})

router.get('/word', (ctx, next) => {
    ctx.bodt = 'word'
})


app.use(router.routes());

app.use((ctx) => {
    // ctx.body = '234'
})
app.listen(3004);

