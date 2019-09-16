const http = require('http');
const uuid = require('uuid')
const querystring = require('querystring');


const session = { // 存放卡号和对应的信息

}

const cardName = 'zf';
const server = http.createServer((req, res) => {
    let cookieObj = querystring.parse(req.headers.cookie, '; ', '=');
    let cardId = cookieObj[cardName];
    console.log(cookieObj[cardName]);

    if(cardId) {
        session[cardId].money -= 10;
        res.end(session[cardId].money+'');
    } else {
        // 不存在生成一个卡，并初始化钱数，保存在内存中
        let cardId = uuid.v4();
        session[cardId] = {money: 100};
        res.setHeader('Set-Cookie', `${cardName}=${cardId}; httOnly=true`)
        res.end('welcome')
    }
    
})

server.listen(4000)
