let url = require('url');
let Route = require('./route');
let Layer = require('./layer');
const methods = require('methods');

function Router(req, res) {  // 为了满足let user = express.Router();
    let router = (req, res, next) => {
        router.handler(req, res, next); //处理新的留有系统。如果内部处理不了，再执行官外层中间件
    }
    router.stack = [];
    // router.__proto__ =  proto;  // 如果用户new
    Object.setPrototypeOf(router, proto);
    return router;
}

let proto = {};


proto.route = function(path) {
    let route = new Route();  //创建一个route
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}   

proto.use = function(path, handler) {
    if(typeof handler === "undefined") {
        handler = path;
        path = '/';
    }
    let layer = new Layer(path, handler)
    path.route = undefined; // 中间件是没有route属性的 
    this.stack.push(layer);
}

proto.param = function(key, handler) {
    // 订阅
    (this.paramsCallback[key] || (this.paramsCallback[key]=[])).push(handler);
}
proto.paramsCallback = {};
proto.handle_param = function(layer, req, res, out) {
    // 需要将订阅好的执行
    if(layer.keys && layer.keys.length) {
        return out(); // 当前没有需要执行的param方法
    }
    let keys = layer.keys.map(item => item.name);
    let key;
    let idx = 0;
    let callbacks;
    var param = () => {
        if(idx >= keys.length) return out();
        key = keys[idx++]
        callbacks = this.paramsCallback[key]; // id => [fn, fn]
        if(!callbacks) {
            param()
        } else {
            execCallback();
        }
    }
    let i = 0;
    let execCallback = () => {
        let fn = callbacks[i++];
        if(fn) {
            fn(req, res, execCallback, layer, params[key], key);
        } else {
            i = 0;
            param();
        }
    }
    param()
}

methods.forEach((method) => {
    proto[method] = function(path, handlers) {
        if(!Array.isArray(handlers)) { //因为用户可能不是通过app来调用的get方法，所以传递过来的handlers可能是一个函数
            handlers = [handlers];
        }
        // 创建一个层，放到statck中
        // 创建一个route 里面专门存放handler
        // layer.route = route
        
        // 调用route方法，返回当前层对应的route的实例
        let route = this.route(path);
        route[method](handlers); //把当前的handler保存到route中
    }
})


proto.handler = function(req, res, out) {
    // 请求到来会执行此方法
    // 先取出用户的请求的路径
    let {pathname} = url.parse(req.url);
    let idx = 0;
    let removed = '';
    let next = (err) => {  // 无论是中间件，还是路由，都统一在最外层的路由系统中处理
        if(removed.length) {
            req.url = removed + req.url;
            removed = '';
        }
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
                    // 普通中间件执行的时候需要删除前面的路径
                    if(layer.path !== '/') {
                        removed = layer.path;
                        req.url = req.url.slice(removed.length);
                    }
                    layer.handler(req, res, next);
                } else {
                    // 路由
                    if(layer.route.match(req.method)) {
                        req.params = layer.params;
                        // 如果是路由就之心(在执行之前需要将订阅的内容执行)
                        proto.handle_param(layer, req, res, () => { // out方法
                            layer.handler(req, res, next);
                        })
                        
                    } else {
                        next();
                    }
                }
            }else {
                next();
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
