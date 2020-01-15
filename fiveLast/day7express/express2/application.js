const http = require('http');
const url = require('url');

function Application() {
  this.routes = [
    {
      path: '*',
      method: '*',
      handler: function(req, res) {
        res.end(`Not Found ${req.method} ${req.path}`)
      }
    }
  ]
}

Application.prototype.get = function(path, handler) {
  this.routes.push({
    path,
    method: 'get',
    handler
  })  
}

Application.prototype.listen = function(...args) {
  let server = http.createServer((req, res) => {
    let {pathname} = url.parse(req.url);
    let method = req.method.toLowerCase();
    for(let i = 1; i < this.routes.length; i++) {
      let {path, method: m, handler} = this.routes[i];
      if(path === pathname && method === m) {
        return handler(req, res);
      }
    }
    this.routes[0].handler(req, res);
  })
  server.listen(...args);
}

module.exports = Application;