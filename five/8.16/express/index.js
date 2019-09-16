const http = require('http');
const url = require('url');


let routes = [{
    path: '*',
    method: 'get',
    handler(req, res) {
        res.end(`cannot ${req.method} ${req.url}`)
    }
}];
function createApplication() {
    return {
        get(path, handler) {
            routes.push({
                path,
                method: 'get',
                handler
            })
        },

        listen(...args) {
            http.createServer((req, res) => {
                let method = req.method.toLowerCase();
                let {pathname} = url.parse(req.url);
                for(let i = 0; i < routes.length; i++) {
                    const {method: m, path, handler} = routes[i];
                    if(m === method && path === pathname) {
                        handler(req, res);
                        return;
                    }
                }   
                routes[0].handler(req, res);
            }).listen(...args);
        }
    }
}


module.exports = createApplication;