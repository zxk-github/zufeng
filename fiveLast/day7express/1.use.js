const express = require('express');

const app = express();

app.use(function(req, res, next) {
  console.log(1);
  next();
  console.log(2);
})

app.use(function(req, res, next) {
  console.log(3);
  next('这是错误内容');
  console.log(4);
})

app.use(function(req, res, next) {
  console.log(5);
  next();
  console.log(6);
})


// 任何一个next出现错误，会通过所有中间件执行参数为4个的中间件
app.use(function(err, req, res, next) {
  console.log(err); // 专门处理错误
})
app.listen(5001, function() {
  console.log('server start')
})

