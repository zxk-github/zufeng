const http = require('http');

module.exports = class {
  use(fn) {
    this.fn = fn;
  }
  handlerRequest(req, res) {
    this.fn(req, res)
  }
  listen() {
    let server = http.createServer(this.handlerRequest.bind(this));
    server.listen(...arguments)
  }
}