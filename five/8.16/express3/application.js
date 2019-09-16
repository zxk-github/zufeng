const http = require('http');
const url = require('url');
const methods = require('methods');
const Router = require('./router');

function Application() {
    // this.router = new Router();
}

Application.prototype.lazy_router = function() {
    if(!this.router) {
        this.router = new Router();
    }
}
methods.forEach(method => {
    Application.prototype[method] = function(path, ...handler) {
        this.lazy_router();
        this.router[method](path, handler);
        return this; //为了支持链式调用
    }
})


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