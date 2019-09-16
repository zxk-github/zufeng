const http = require('http');
const url = require('url');

function Application() {
    this.routes = [{
        path: '*',
        method: 'get',
        handler(req, res) {
            res.end(`connot ${req.method} ${req.url}`);
        }
    }]
}

Application.prototype.get = function(path, handler) {
    this.routes.push({
        method: 'get',
        path, 
        handler
    })
    return this; //为了支持链式调用
}

Application.prototype.listen = function() {
    http.createServer((req, res) => {
        const method = req.method.toLowerCase();
        const {pathname} = url.parse(req.url);
        for(let i = 1; i < this.routes.length; i++) {
            const {method: m, path, handler} = this.routes[i];
            if(method === m && pathname === path) {
                handler(req, res);
                return
            }
        }
        this.routes[0].handler(req, res); 
    }).listen(...arguments);
}

module.exports = Application;