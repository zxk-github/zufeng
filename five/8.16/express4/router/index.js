let url = require('url');
let Route = require('./route');
let Layer = require('./layer');
const methods = require('methods');

function Router(req, res) {
    this.stack = [];
}


Router.prototype.route = function(path) {
    let route = new Route();  //创建一个route
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}   

Router.prototype.use = function(path, handler) {
    if(typeof handler === "undefined") {
        handler = path;
        path = '/';
    }
    let layer = new Layer(path, handler)
    path.route = undefined; // 中间件是没有route属性的 
    this.stack.push(layer);
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
    let next = (err) => {  // 无论是中间件，还是路由，都统一在最外层的路由系统中处理
        if(idx >= this.stack.length) return out(req, res); 
        let layer = this.stack[idx++];
        if(err) { // 如果有错误，就找参数是四个的中间件
            if(!layer.route) {
                // 找到就让错误中间件执行
                if(layer.handler.length === 4) {
                    layer.handler(err, req, res, next);
                }
            } else {
                next(err); // 是路由继续向下找
            }
        } else {
            if(layer.match(pathname)) {
                if(!layer.route) {
                    // 如果是中间件
                    if(layer.handler.length === 4) {
                        // 如果是错误处理中间件，在默认正常情况下是不执行的
                        return next();
                    }
                    layer.handler(req, res, next);
                } else {
                    // 路由
                    if(layer.route.match(req.method)) {
                        layer.handler(req, res, next);
                    } else {
                        next();
                    }
                }
            }
        }
        // 需要看一下当前是不是路由，如果是路由需要匹配方法
        // if(layer.match(pathname) && layer.route.match(req.method)) {
        //     // 如果路径相同
        //     layer.handler(req, res, next) // 执行当前layer上的dispatch方法， 并且把下一个layer的逻辑传递进route去
        // } else {
        //     next();
        // }
    }
    next()
}

module.exports = Router;
