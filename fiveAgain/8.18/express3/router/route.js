const Layer = require('./layer');
const methods = require('methods');

function Route() {
  this.stack = [];
  // this.methods = {};
}

methods.forEach(method => {
  Route.prototype[method] = function(handlers) {
    handlers.forEach(handler => {
      const layer = new Layer(null, handler);
      layer.method = method;
      this.stack.push(layer);
    })
  }
})


Route.prototype.dispatch = function(req, res, out) {
  let idx = 0;
  let next = () => {
    if(idx >= this.stack.length) return out(req, res);
    let layer = this.stack[idx++];
    if(layer.method === req.method.toLowerCase()) {
      layer.handler(req, res, next); // 执行对应的方法，因为有可能一个路由会传递多个处理函数，所有会向下执行
    } else {
      next();
    }
  }
  next()
}

module.exports = Route;
