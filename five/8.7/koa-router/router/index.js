const Router = require('koa-router');
const userRouter = require('./user');
const productRouter = require('./product');
const rootRouter = new Router();

rootRouter.use('/user', userRouter.routes());
rootRouter.use('/product', productRouter.routes());

module.exports = rootRouter;
