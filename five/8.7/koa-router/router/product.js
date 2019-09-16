const Router = require('koa-router');

const router = new Router();

router.get('/detail', (ctx, next) => {
    ctx.body = 'product detail';
})

router.get('/id', (ctx, next) => {
    ctx.body = 'product id';
})

module.exports =  router;
