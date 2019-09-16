const Router = require('koa-router');

const router = new Router();

router.get('/detail', (ctx, next) => {
    ctx.body = 'user detail'
})

router.get('/id', (ctx, next) => {
    ctx.body = 'user id'
})

module.exports =  router;
