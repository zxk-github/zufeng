const http = require('http');
const url = require('url');

let routes = [{
  path: '*',
  method: 'get',
  handler(req, res) {
    res.end(`cannot ${req.method} ${req.url}`)
  }
}]

function createApplication() {
  return {
    get(path, handler) {
      routes.push({
        path,
        method: 'get',
        handler
      })
    },
    listen() {
      http.createServer((req, res) => {
        let method = req.method.toLowerCase();
        let {pathname} = url.parse(req.url);
        for(let i = 1; i < routes.length; i++) {
          let {path: p, method: m, handler} = routes[i];   
          if(method === m && pathname === p) {
            handler(req, res);
            return;
          }
        }
        routes[0].handler(req, res);
      }).listen(...arguments);

    }
  }
}

module.exports = createApplication;