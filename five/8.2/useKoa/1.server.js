const Koa = require('koa');

const app = new Koa();

app.use((ctx) => {
    console.log('url', ctx.request.url);
    console.log('originalUrl', ctx.request.originalUrl);
    console.log('origin', ctx.request.origin);
    console.log('href', ctx.request.href)
    console.log('path', ctx.request.path)
    console.log('querystring', ctx.request.querystring)
    console.log('search', ctx.request.search);
    console.log('host', ctx.request.host);
    console.log('hostname', ctx.request.hostname)
    console.log('URL', ctx.request.URL);
    console.log('type', ctx.request.type);
    console.log('charset', ctx.request.charset)
    console.log('query', ctx.request.query)
    console.log('fresh', ctx.query.fresh)
    console.log('protocol', ctx.query.protocol);
    ctx.body = '23'
    
})

app.listen(3000, () => {
    console.log('server start')
})

