// const Koa = require('koa');

const Koa = require('./application')
const app = new Koa();


// koa一共暴露出来三个方法的  app.use app.listen app.on('error')
// app.use((ctx) => {
//     // ctx.body = '123'
//     // res.end('1231');
//     console.log(ctx.req.url)
//     console.log(ctx.request.req.url); // 这两个直接获取的是node的原生模块

//     console.log(ctx.request.url)
//     console.log(ctx.url);  //下面的两个是自定的Koa request上的模块

//     ctx.body = '123'
// })

app.use((ctx, next) => {
    console.log(1);
    next();
    console.log(2);
})
app.use((ctx, next) => {
    console.log(3);
    next();
    next();
    console.log(4);
})
app.use((ctx, next) => {
    console.log(5);
    next();
    console.log(6);
})
    

app.listen(4000);


