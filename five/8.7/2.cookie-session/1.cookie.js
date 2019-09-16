const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/read') {
        const cookie = req.headers.cookie;
        console.log(cookie);
        res.end(cookie);
    }
    if(req.url === '/write') {
        res.setHeader('Set-cookie', "count=10;domain=localhost; path=/read; max-age=10; httpOnly=true;")
        res.end('write ok');
        return ;
    }
})

server.listen(3000);


