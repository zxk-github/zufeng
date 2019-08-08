const Koa = require('./koa1/application');


const app = new Koa();

//next 指代的是下一个use中注册的方法
// koa中只要是异步逻辑，就把它分装成一个promise

// 必须等待后面的中间件 函数执行完成之后再继续执行，所以必须要在next前面增加await属性
// 所有中间件组成一个超级大的promise
// 等待这个promise成功后将结果返回(这中间正确的流程是，中间件按照洋春模型的顺序依次执行)
// 所以需要加上await next() / return next()(但是不会执行后面的代码了)
app.use((ctx, next) => {
    console.log(1);
    next();
    console.log(2);
})

app.use((ctx, next) => {
    console.log(3);
    next();
    console.log(4);
})
app.use((ctx, next) => {
    console.log(5);
    next();
    console.log(6);
})

app.listen(3001);

