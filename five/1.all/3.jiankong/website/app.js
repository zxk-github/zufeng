let Koa = require('koa');
let path = require('path');
let Server = require('koa-static');

let app = new Koa();
app.use(Server(path.join(__dirname, 'client')));

app.listen(3002, function() {
  console.log('http://localhost:3000')
})



