const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Koa {
    constructor() {
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
    }

    use(fn) {
        this.fn = fn;
    }
    createContext(req, res) {
        this.context.request = this.request; // 这就满足了this.context.request.url访问的是koa的创建的模块
        this.context.req = req;            // 这就满足ctx.req.url 直接访问node的原生模块
        this.context.request.req = req;   // 这就满足了ctx.request.req.url //直接访问的node原生模块

        this.context.response = this.response;
        this.context.res = res;
        this.context.response.res = res;
        
        return this.context;
    }
    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        this.fn(ctx);
    }
    listen() {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments);
    }
}


module.exports = Koa;