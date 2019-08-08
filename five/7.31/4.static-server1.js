const http = require('http');
const path = require('path');
const fs = require('fs').promises;
const url = require('url');
const { createReadStream } = require('fs');
const mime = require('mime');

class Server{
    constructor({port}) {
        this.port = port;
    }
    async handleRequest(req, res) {
        const { pathname } = url.parse(req.url);
        let filepath = path.join(__dirname, pathname);
        try {
            let stats = await fs.stat(filepath);
            if(stats.isDirectory()) {
                filepath = path.join(filepath, 'index.html');
                await fs.access(filepath);
            }
            this.sendFile(req, res, filepath);
        } catch (e) {
            this.sendError(req, res);
        }
    }
    sendFile(req, res, filepath) {
        res.setHeader('Content-Type', mime.getType(filepath)+';charset=utf-8');
        createReadStream(filepath).pipe(res);
    }
    sendError(req, res) {
        res.statusCode = 404;
        res.end();
    }
    start() {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, () => {
            console.log(`server start ${this.port}`)
        })
    }
}

const server = new Server({
    port: 5001
});
server.start();

