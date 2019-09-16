const session = require('koa-session');
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

// koa的加密使用的是sha1,并且加密产生的签名是使用‘key=value’
const crypto = require('crypto');
let str = 'name=zf';
console.log(crypto.createHmac('sha1', 'zhang').update(Buffer.from(str)).digest('base64'));
// xDl_fHP25mhj6Vr_vEkuupjCNEg 
// xDl/fHP25mhj6Vr/vEkuupjCNEg=
// router.get('/write', (ctx, next) => {
//     ctx.cookies.set('name', 'zf', {signed: true});
//     ctx.cookies.set('age', '10');
//     ctx.body = '123';
// })

router.get('/', async (ctx, next) => {
    await ctx.render('home');
})

router.post('/login', async (ctx) => {
    let {username, password} = ctx.request.body;
    if(username === password) {
        ctx.session.username = username;
        ctx.redirect('/profile');
    } else {
        ctx.redirect('/');
    }
})
router.get('/profile', async (ctx) => {
    if(ctx.session.username) {
        await ctx.render('profile', {name: ctx.session.username});
    } else {
        ctx.redirect('/');
    }
})

app.use(bodyparser())
app.use(views(path.resolve(__dirname, 'views')), {
    map: {
        html: 'ejs'
    }
})

app.keys = ['zhang'];
app.use(session({
    httpOnly: true,
    maxAge: 3000000
},app))
app.use(router.routes());


app.listen(4000)


