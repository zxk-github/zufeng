const http = require('http');
const EventEmitter = require('event');
const Stream = require('stream');
const context = require('./context');
const request = require('./request');
const response = require('./response');


module.exports = class extends EventEmitter {
  constructor() {
    super();
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.middlewares = [];
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
    this.middlewares.push(fn)
  }
  compose(ctx) {
    let i = -1;
    let dispatch = (index) => {
      if(index <= i) return Promise.reject('multiple call next')
      i = index;
      if(index === this.middlewares.length) return Promise.resolve(); 
      let middleware = this.middlewares[index];
      return Promise.resolve(middleware(ctx, () => dispatch(index+1)))
    }
    return dispatch(0);
  }
  handlerRequest(req, res) {
    let ctx = this.createContext(req, res);
    res.statusCode = 404;
    this.compose(ctx).then(() => {
      let _body = ctx.body;
      if(typeof _body === 'string' || Buffer.isBuffer(_body)) {
        return res.end(_body);
      } else if (typeof _body === 'number') {
        return res.end(''+_body);
      } else if(_body instanceof Stream) {
        res.setHeader('Content-Disposition', 'attachment;filename='+encodeURIComponent('下载'))；
        _body.pipe(res);
      } else if (typeof _body === 'object') {
        return res.end(JSON.stringify(_body))
      }
      res.end('not Found');
    }).catch(err => {
      this.emit('error', err)
    })
    
  }
  listen() {
    let server = http.createServer(this.handlerRequest.bind(this));
    server.listen(...arguments)
  }
}