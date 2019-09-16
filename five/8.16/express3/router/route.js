const Layer = require('./layer');
const methods = require('methods');

function Route() {
    this.stack = [];
    this.methods = {}; // 为了实现匹配方法的时候，可以少匹配
}

methods.forEach((method) => {
    Route.prototype[method] = function(handlers) {
        handlers.forEach(handler => {
            const layer = new Layer(null, handler);
            layer.method = method;
            this.methods[method] = true;
            this.stack.push(layer);
        });
    }
})

Route.prototype.match = function(method) {
    return this.methods[method.toLowerCase()];
}

Route.prototype.dispatch = function(req, res, out) {
    let idx = 0;
    let next = () => {
        if(idx >= this.stack.length) return out(req, res); 
        let layer = this.stack[idx++];
        if(layer.method === req.method.toLowerCase()) {
            layer.handler(req, res, next); // 执行对应的方法
        } else {
            next();
        }
    }
    next();
}

module.exports = Route;