const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

module.exports = class {
  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }  

  createContext(req, res) {
    let ctx = this.context;
    ctx.request = this.request;    // ctx.request.url
    ctx.request.req = ctx.req = req; // ctx.request.req.url  ctx.req.url

    ctx.response = this.response;
    ctx.response.res = ctx.res = res;
    return ctx;
  }

  use(fn) {
    this.fn = fn;
  }
  handlerRequest(req, res) {
    let ctx = this.createContext(req, res);
    this.fn(ctx);
    if(ctx.body) {
      res.end(ctx.body);
    }
  }
  listen() {
    let server = http.createServer(this.handlerRequest.bind(this));
    server.listen(...arguments)
  }
}