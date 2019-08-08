const http = require('http');
const context = require('./context'); // 为了方便使用 koa封装了一个ctx, 里面包含了请求req, 响应res
const request = require('./request'); // request 包含了req中的属性和方法
const response = require('./response'); // response包含了res中的属性和方法
// ctx 集成了req, res, response, request
// req, res是原生的 request response是二次分装的

// koa本质上就像外暴露了三个方法 use listen on('error')

class Koa {
    constructor() {
        this.context = Object.create(context) // 利用原型链，防止添加属性的时候修改原文件
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    // 创建上下文 ctx
    createContext(req, res) {
        let ctx = this.context;
        
        // 创建好的上直接返回就好
        // console.log(ctx.req.url)  
        // console.log(ctx.request.req.url)

        // console.log(ctx.request.url)
        // console.log(ctx.url);
        ctx.request = this.request; // 满足 ctx.request.url 访问到自定义模块

        ctx.request.req = req; // 满足 ctx.request.req.url 直接访问到原生模块
        ctx.req = req; // 满足 ctx.req.url 直接能访问到原生模块 

        ctx.response = this.response;
        ctx.response.res = res;
        ctx.res = res;


        return ctx;
    }

    compose(ctx) {
        let index = 0;
        let i = -1;
        // 作业：用reduce 实现这个逻辑
        // 在同一个方法中掉两次next 
        const  dispatch =()=>{ // dispatch执行后需要返回一个promise
            // 如果最后一个use方法调用了next方法就结束即可
            if(index <= i ) return Promise.reject('multiple call next()')
            i = index;// 为了防止多次调用 多次调用index值不会发生变化，但是i第一次已经和index相等了，所以第二次在调用 i 和 index相等 就抛出错误
            if(index === this.middlewares.length) return Promise.resolve();
            let middleware = this.middlewares[index++] // 取出第一个来执行
           
            // 如果这个中间件不是promise 那我就把他包装成一个promise
            return Promise.resolve(middleware(ctx,()=>dispatch())); // 调用此中间件方法
        }
        return dispatch();
    }

    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        // this.fn(ctx);
        this.compose(ctx).then(() => {
            if(ctx.body) {
                res.end(ctx.body)
            }
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    listen(port, cb) {
        const server = http.createServer(this.handleRequest.bind(this)); 
        server.listen(port, cb);
    }

}

module.exports = Koa