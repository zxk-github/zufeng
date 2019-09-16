// 内部继承了路由系统
// 内置中间件 

const express = require('express');

const app = express();

app.get('/:id/:name/address', function(req, res, next) {
    // req.params 
})



app.listen(4000)



// 将内容路径转换为正则 匹配到请求路径 将结果拿到交给用户
let config = '/:id/:name/address';
let requestUrl = '/1/2/address';
let keys =[];
let str = config.replace(/:([^\/]+)/g, function() {
    keys.push(arguments[1]);
    return '([^\/]+)'
})
let r = requestUrl.match(new RegExp(str)).slice(1);
let params = {};
keys.forEach((key, index) => {
    params[key] = r[index];
})
console.log(params);  // { id: '1', name: '2' }

let pathToRegExp = require('path-to-regexp');





