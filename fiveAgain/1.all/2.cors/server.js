const express = require('express');

const app = express();


let whiteList = [
  'http://localhost:3002'
]
app.use(function(req, res, next) {
  let origin = req.headers.origin;
  if(whiteList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Headers', 'name')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    res.setHeader('Access-Control-Max-Age', 6)
  }
  next();
})

app.put('/data', function(req, res) {
  console.log(res.getHeader('Access-Control-Allow-Headers'))
  res.send('hh')
})

app.listen(3003, function() {
  console.log('后端服务启动')
})


/**
 * 
 * Access-Control-Allow-Origin
 * Access-Control-Allow-Methods
 * Access-Control-Allow-Headers
 * Access-Control-Allow-Credentials
 * Access-Control-Max-Age
 * 
 * 
 */