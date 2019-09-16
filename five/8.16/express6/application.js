const http = require('http');
const url = require('url');
const methods = require('methods');
const Router = require('./router');

function Application() {
    // this.router = new Router();
    this.settings = {};
    this.engine = {}; //内部的参数设置
}
Application.prototype.engine = function(ext, renderFn) {
    this.engine[ext] = renderFn;
}
// 设置和获取都合并到一个函数
Application.prototype.set = function(key, value) {
    if(arguments.length === 1) {
        return this.settings[key];
    }
    this.settings[key] = value;
}

Application.prototype.lazy_router = function() {
    if(!this.router) {
        this.router = new Router();
        // 当前路由创建完毕之后就初始化内置中间件
        this._init();
    }
}
Application.prototype._init = function() {
    // 初始化中间件
    this.use((req, res, next) => {
        // 初始化各种中间件
    })
}
Application.prototype.use = function(path, handler) {
    this.lazy_router(); // 确保路由已经产生
    this.router.use(path, handler)
}
methods.forEach(method => {
    Application.prototype[method] = function(path, ...handler) {
        // 如果是get方法，并且参数只有一个 就会到set方法，把参数传过去
        if(method === 'get' && arguments.length === 1) {
            return this.set(key);
        }
        this.lazy_router();
        this.router[method](path, handler);
        return this; //为了支持链式调用
    }
})
Application.prototype.param = function(key, handler) {
    this.lazy_router();
    this.router.param(key, handler);
}


Application.prototype.listen = function() {
    this.lazy_router();
    http.createServer((req, res) => {
        function done(req, res) {
            res.end(`connot ${req.method} ${req.url}`)
        }
        this.router.handler(req, res, done);
    }).listen(...arguments);
}

module.exports = Application;