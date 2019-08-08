const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');


module.exports = class {
    constructor() {
        // 全局对象不能直接使用，必须放在类的实例上再申明一份
        this.context = Object.create(context); // 生产了一对象，操作context对象不会导致原文件的变化
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.fn;
    }
    use(fn) {
        this.fn = fn;
    }
    // 创建上下文
    createContext(req, res) {
        // 创建好的上线返回就好
        let ctx = this.context;

        ctx.request = this.request;  // 将封装的request方到ctx上  也为了满足ctx.request.url
        ctx.request.req = req;    // 为了满足 ctx.request.req.url

        ctx.req = req;// 为了满足 ctx.req.url

        ctx.response = this.response;
        ctx.response.res = res;
        ctx.res = res;
        return ctx;
    }

    // 处理请求方法
    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        this.fn(ctx);
        if(ctx.body) {
            res.end(ctx.body);
        }
    }
    listen() {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments);
    }
}