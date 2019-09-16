const express = require('express');

const app = express(); //app自身就是一个路由系统

const user = express.Router(); // Router就是之前写的Router

app.use(function(req, res, next) {
    console.log(111);
    next();
})
user.use('/', function(req, res, next) {
    console.log(333);
    next();
})

user.get('/', function(req, res) {
    res.end('a');
})

app.get('/', function(req, res) {
    console.log(444);
    res.end('aaa');
})

app.use('/user', user);
app.listen(4000)
