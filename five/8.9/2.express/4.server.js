// 内部继承了路由系统
// 内置中间件 

const express = require('express');

const app = express();

const path = require('path');

const router = express.Router();

router.get('/add', function(req, res, next) {
    
})
router.get('/delete', function(req, res, next) {
    
})
app.use('/user', router);

// 中间都是函数类型
app.use(express.static(__dirname));

//req/res 功能比较弱，内部会初始化中间件，增加req, res的功能


app.listen(4000)

