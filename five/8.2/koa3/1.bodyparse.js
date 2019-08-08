const Koa = require('koa');

const app = new Koa();

// 中间件 中间执行的逻辑 可以在ctx上扩展逻辑 
// 1. 在上一个中间件中扩展的属性 下一个中间件中可以获取到
// 2. 决定代码是否向下执行

// bodyparse会在 添加一个ctx.request.body

// 中间件写法就是返回一个async函数，如果需要向下执行就调用next
const bodyParser = () => {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = [];
            ctx.req.on('data', function(data) {
                arr.push(data);
            })
            ctx.req.on('end', function() {
                // 判断 表单 json 文件上传
                ctx.request.body = Buffer.concat(arr).toString();
                resolve();
            })
        })
        await next();
    }
}

app.use(bodyParser());

app.use(async (ctx, next) => {
    if(ctx.method === 'GET' && ctx.path === '/form') {
        ctx.body = `
            <form action="/login" method='POST'>
                <input type='text' name="username" />
                <input type='text' name="username" />
                <button>click</button>
            </form>
        `
    } else {
        await next();
    }
})
// ** 如果在中间件内部有异步处理逻辑 一定要返回一个promise

// function bodyParser(ctx) {
//     return new Promise((resolve, reject) => {
//         const arr = [];
//         ctx.req.on('data', function(data) {
//             arr.push(data);
//         })
//         ctx.req.on('end', function() {
//             resolve(Buffer.concat(arr).toString());
//         })
//     })
// }

app.use(async (ctx, next) => {
    if(ctx.method === 'POST' && ctx.path === '/login') {
        ctx.body = ctx.request.body;
    }  
})

app.listen(3007)