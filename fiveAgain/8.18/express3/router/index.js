const url = require('url');
const methods = require('methods');
const Route = require('./route');
const Layer = require('./layer');

function Router() {
  this.stack = [];
}

Router.prototype.layer_route = function(path) {
  let route = new Route(); //创建一个route
  let layer = new Layer(path, route.dispatch.bind(route)); // 创建layer，保存着当前path,和route.dispatch
  layer.route = route;
  this.stack.push(layer);
  return route;
}

methods.forEach((method) => {
  Router.prototype[method] = function(path, handlers) {
    let route = this.layer_route(path);
    route[method](handlers);  // handler是真正的请求处理，保存在route中
    console.log(this.stack);
  }
})


// 请求到来时会执行，循环this.statck，拿到每一个layer，根据layer.path上保存的路径和访问路径之间进行匹配，匹配到之后执行对应的handler，其实就是执行route.dispath，交给route进行处理，然后遍历对应的route.stack，找到method相同的执行对应的handle
Router.prototype.handler = function(req, res, out) {
  let {pathname} = url.parse(req.url);
  let idx = 0;
  let next = () => {
    if(idx >= this.stack.length) return out();
    let layer = this.stack[idx++];
    if(layer.path === pathname) {
      layer.handler(req, res, next) // 执行当前layer上的dispatch方法, 并且把下一个layer的逻辑传递进route中去
    } else {
      next();
    }
  }
  next()
}

module.exports = Router;
