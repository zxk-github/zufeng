const http = require('http');

class Koa {
    use(fn) {
        this.fn = fn;
    }

    handleRequest(req, res) {
        this.fn(req, res);
    }

    listen(port, cb) {
        const server = http.createServer(this.handleRequest.bind(this)); 
        server.listen(port, cb);
    }

}

module.exports = Koa