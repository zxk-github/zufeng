const http = require('http');
const url = require('url');
const routes = [
  {
    path: '*',
    method: '*',
    handler: function(req, res) {
      res.end(`Node ${req.method} ${req.path}`);
    }
  }
]

function createApplication() {
  return {
    get(path, handler) {
      routes.push({
        path,
        method: 'get',
        handler
      })
    },
    listen(...args) {
      let server = http.createServer(function(req,res) {
        let {pathname} = url.parse(req.url);
        let method = req.method.toLowerCase();
        for(let i = 1; i < routes.length; i++) {
          let {path, method: m, handler} = routes[i];
          if(pathname === path && method === m) {
            return handler(req, res);
          }
        }
        routes[0].handler(req, res);
      })
      server.listen(...args);
    }

  }
}

module.exports = createApplication;