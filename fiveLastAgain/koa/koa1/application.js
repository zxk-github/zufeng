const http = require('http');
const EventEmmit = require('events');
const Stream = require('stream');
const context = require('./context');
const request = require('./request');
const response = require('./response');


module.exports = class extends EventEmmit {
  constructor() {
    super();
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.middlewears = [];
  }

  use(fn) {
    this.middlewears.push(fn);
  }

  createContext(req, res) {
    let ctx = this.context;
    ctx.request = this.request;
    ctx.request.req = ctx.req = req;

    ctx.response = this.response;
    ctx.response.res = ctx.res = res;
    
    return ctx;
  }
  compose(ctx) {
    let i = -1;
    const dispatch = (index) => {
      if(index <= i) {
        throw new Error('middleareare call muilpuli times');
      }
      i = index;
      if(index === this.middlewears.length) return Promise.resolve(); 
      let middlewear = this.middlewears[index];
      return Promise.resolve(middlewear(ctx, () => dispatch(index+1)))
    }
    return dispatch(0);
  }

  handlerRequest(req, res) {
    let ctx = this.createContext(req, res)
    res.statusCode = 404;
    this.compose(ctx).then(() => {
      let _body = ctx.body;
      if(_body) {
        if( typeof _body === 'number') {
          res.end(_body + '');
        } 
        if(typeof _body === 'object') {
          res.end(JSON.stringify(_body))
        }
        if(_body instanceof Stream) {
          res.setHeader('Content-Disposition', 'attachment;filename='+encodeURIComponent('下载'));
          _body.pipe(res);
        }
        if(typeof _body === 'string' || Buffer.isBuffer(_body)) {
          res.end(_body)
        }
        res.end('Not Found')
      }
    }).catch((err) => {
      this.emit('error', err)
    })
  }

  listen() {
    let server = http.createServer(this.handlerRequest.bind(this));

    server.listen(...arguments);
  }
}

