// 内部继承了路由系统
// 内置中间件 

const express = require('express');

const app = express();

app.get('/', function(req, res, next) {
    console.log(1);
    next();
})
app.get('/', function(req, res, next) {
    console.log(2);
    next();
})
app.get('*',function(req, res, next) {
    console.log('all1');
    next();
})
app.all('*',function(req, res, next) {
    console.log('all');
})


app.listen(4000)

