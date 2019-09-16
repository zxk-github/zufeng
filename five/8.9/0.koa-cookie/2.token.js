const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const jwt = require('jwt-simple');

const router = new Router();
const app = new Koa();
const secret = 'jw';
router.post('/login', (ctx, next) => {
    let {username, password} = ctx.request.body;
    ctx.body = jwt.encode({username}, secret);
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.2hz5_7X9Qu2NM9OnzzYSFhw42LK2SUgJBDXfDJ6K7sM
})
app.use(bodyparser());
app.use(router.routes());
app.use(static(__dirname));

app.listen(4000)

const crypto = require('crypto');

const jwt = {
    encode() {
         
    }
}
//头转base64 payload转base64 合起来签名
//校验的时候 合起来签名一样 然后 反解payload出来正常的数据