let url = require('url');
let Route = require('./route');
let Layer = require('./layer');
const methods = require('methods');

function Router(req, res) {
    this.stack = [];
}


Router.prototype.route = function(path) {
    let route = new Route();  //
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}   

methods.forEach((method) => {
    Router.prototype[method] = function(path, handlers) {
        // 创建一个层，放到statck中
        // 创建一个route 里面专门存放handler
        // layer.route = route
        
    
        // 调用route方法，返回当前层对应的route的实例
        let route = this.route(path);
        route[method](handlers); //把当前的handler保存到route中
    }
})


Router.prototype.handler = function(req, res, out) {
    // 请求到来会执行此方法
    // 先取出用户的请求的路径
    let {pathname} = url.parse(req.url);
    let idx = 0;
    let next = () => {
        if(idx >= this.stack.length) return out(req, res); 
        let layer = this.stack[idx++];
        if(layer.match(pathname) && layer.route.match(req.method)) {
            // 如果路径相同
            layer.handler(req, res, next) // 执行当前layer上的dispatch方法， 并且把下一个layer的逻辑传递进route去
        } else {
            next();
        }
    }
    next()
}

module.exports = Router;
