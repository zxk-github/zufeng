const http = require('http');
const url = require('url');
const methods = require('methods');
const Router = require('./router');

function Application() {
  this.router = new Router();
}

methods.forEach(methods => {
  Application.prototype[method] = function(path, ...handler) {
    // 向router.statck中保存所有的路由信息
    this.router[method](path, handler);
    return this; // 为了方便链式调用
  }
})


Application.prototype.listen = function() {
  http.createServer((req, res) => {
    function done() {
      res.end(`cannot ${req.method} ${req.url}`);
    }
    this.router.handler(req, res, done);
  })
} 

module.exports = Application;

