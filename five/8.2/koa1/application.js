const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const EventEmitter = require('events');

module.exports = class extends EventEmitter {
    constructor() {
        super();
        // 全局对象不能直接使用，必须放在类的实例上再申明一份
        this.context = Object.create(context); // 生产了一对象，操作context对象不会导致原文件的变化
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
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
    compose(ctx) {   // ctx代表上下文对象
        // 多次调用next index值不会发生变化 但是i第一次调用时候 已经和index相等 所以第二次调用的时候会抛出错误
        let i = -1;
        let dispatch = (index) => { //dispatch执行后需要返回一个promise 
            if(index <= i) return Promise.reject('multiple call next')
            i = index; 
            // 如果最后一个use方法调用了next方法 直接返回成功
            if(index === this.middlewares.length) return Promise.resolve();
            // 如果这个中间件不是promsie，那就包装成promsie
            let middleware = this.middlewares[index];
            return Promise.resolve(middleware(ctx, () => dispatch(index+1)));
        }   
        return dispatch(0);

    }

    // 处理请求方法
    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        // this.fn(ctx); 
        // 把所有的中间件进行组合 成功后将结果返回即可
        res.statusCode = 404;
        this.compose(ctx).then(() => {
            if(ctx.body) {
                return res.end(ctx.body);
            }
            res.end('Not Found')
        }).catch((error) => {
            this.emit('error', error)
        })
        
    }
    listen() {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments);
    }
}