const Koa = require('koa');
const path = require('path');
const fs = require('fs').promises;
const app = new Koa();


const static = (dirname) => {
    return async (ctx, next) => {
        try{
            let pathname = ctx.path;
            console.log(pathname);
            pathname = path.join(dirname, pathname);
            console.log('123', pathname);
            const stats = await fs.stat(pathname);
            if(stats.isDirectory()) {
                pathname = path.join(pathname, 'index.html');
            }   
            ctx.body = await fs.readFile(pathname, 'utf8');
        } catch(e) {
            await next();
        }
    }
}
app.use(static(__dirname));
app.use(static(path.join(__dirname, '../koa1')));

app.listen('3009')