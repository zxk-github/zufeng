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
    }

    use(fn) {
        this.fn = fn;
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

    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        this.fn(ctx);
        if(ctx.body) {
            res.end(ctx.body)
        }
    }

    listen(port, cb) {
        const server = http.createServer(this.handleRequest.bind(this)); 
        server.listen(port, cb);
    }

}

module.exports = Koa