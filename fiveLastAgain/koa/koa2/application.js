let http = require('http');
let EventEmmit = require('events');
let context = require('./context');
let request = require('./request');
let response = require('./response');


module.exports = class extemd {
  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  createContext(req, res) {
    let ctx = this.context;
    ctx.request = this.request;  // ctx.request.path 获取的时候 request里面的this指向
    ctx.request.req = ctx.req = req;

    ctx.response = this.response;
    ctx.response.res = ctx.res = res;
    return ctx;
  }

  compose(ctx) {
    let i = -1
    const dispatch = (index) => {
      if(index <= i) {
        throw new Error('multi use')
      }
      i = index;
      if(index === this.middlewares.length) Promise.resolve();
      let middleware = this.middlewares[index];
      return Promise.resolve(middleware(ctx, () => dispatch(index + 1)));
    }
    return dispatch(0)
  }

  handlerRequest(req, res) {
    let ctx = createContext(req, res);
    this.compose(ctx).then(() => {
      res.statusCode = 404;
      let _body = ctx.body;
      if(_body) {
        return res.end(_body)
      }
      res.end('Not Found')
    }).catch((err) => {
      this.emit('error', err);
    })
  }

  listen() {
    let server = http.createServer(this.handlerRequest.bind(this));
    server.listen(...arguments)
  }
}
