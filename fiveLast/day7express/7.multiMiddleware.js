const express = require('express');

const app = express();

app.get('/', function(req, res, next) {
  console.log(1)
  next()
}, function(req, res) {
  console.log(2)
})

app.get('/', function(req, res) {
  console.log(3);
})

app.listen(5001, function() {
  console.log('server start')
})