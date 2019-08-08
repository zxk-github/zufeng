const http = require('http');
const uuid = require('uuid')
const querystring = require('querystring');


const session = {

}
const server = http.createServer((req, res) => {
    let cookieObj = querystring(req.headers.cookie, '; ', '=');
    let cardId = uuid.v4();
    session[cardId] = {money: 100};
    res.setHeader('Set-Cookie', '')
})

server.listen(4000)
