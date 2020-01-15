const express = require('express');

const app = express();


app.get('/data', function(req, res) {
  let origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Headers', 'name')
  res.setHeader('Access-Control-Allow-Methods', 'Put')
  res.end('111')
})

app.listen(4002, function() {
  console.log('server start')
})


