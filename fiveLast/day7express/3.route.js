const express = require('express');

const app = express();

app.use(function(req, res, next) {
  console.log(1);
  next(); //如果这个next不执行，后面的路由不会执行
  console.log(2)
})

app.get('/a', function(req, res, next) {
  console.log(3);
  next()
  console.log(4)
})


app.get('/a', function(req, res, next) {
  console.log(5);
  next()  // 如果这个next被去除了，后面的中间不会执行
  console.log(6)
})

app.use(function(req, res, next) {
  console.log(7);
  next(); 
  console.log(8)
})

app.all('*', function(req, res) {
  console.log('9')
})

// all所有方法都匹配，*所有路径都匹配

app.listen('5001',  function() {
  console.log('server start')
})