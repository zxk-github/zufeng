let express = require('express');
let app = express();

let whiteList = ['http://localhost:2000'];

app.use(function(req, res, next) {
  let origin = req.headers.origin;
  if(whiteList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'name,age');
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    res.setHeader('Access-Control-Max-Age', 6000);
  }
  if(req.method === 'OPTIONS') {
    res.end()
  }
  next()
})


app.get('/data', function(req, res) {
  res.end('hello word')
})
app.listen(4000)