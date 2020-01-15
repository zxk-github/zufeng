const http = require('http');
const url = require('url');
const Router = require('./router');

function Application() {
  // this.routes = [
  //   {
  //     path: '*',
  //     method: '*',
  //     handler: function(req, res) {
  //       res.end(`Not Found ${req.method} ${req.path}`)
  //     }
  //   }
  // ]
  this.router = new Router();
}

Application.prototype.get = function(path, handler) {
  // this.routes.push({
  //   path,
  //   method: 'get',
  //   handler
  // })  
  
  // Application不再处理放置路由的逻辑，只负责调用Router的方法，路由放置交给Router自己来管
  this.router.get(path, handler);
}

Application.prototype.listen = function(...args) {
  let server = http.createServer((req, res) => {
    // let {pathname} = url.parse(req.url);
    // let method = req.method.toLowerCase();
    // for(let i = 1; i < this.routes.length; i++) {
    //   let {path, method: m, handler} = this.routes[i];
    //   if(path === pathname && method === m) {
    //     return handler(req, res);
    //   }
    // }
    // this.routes[0].handler(req, res);

    function done() {
      res.end(`Not Found ${req.method} ${req.url}`)
    }

    // 将请求响应交给路由处理
    this.router.handler(req, res, done);
  })
  server.listen(...args);
}

module.exports = Application;