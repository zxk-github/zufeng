let express = require('express');
let app = express();

let whiteList = ['http://localhost:3000'];

app.use(function(req, res, next) {
  let origin = req.headers.origin;
  if(whiteList.includes(origin)) {
    console.log(req.headers)
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'name,age');
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    res.setHeader('Access-Control-Max-Age', 6000);
    res.setHeader('Access-Control-Allow-Credentials', true);
    if(req.method === 'OPTIONS') {
      res.end() // 试探性发送的OPTIONS请求不做任何处理
    }
  }
  next()
})


app.get('/data', function(req, res) {
  res.end('hello word')
})
app.listen(4000)