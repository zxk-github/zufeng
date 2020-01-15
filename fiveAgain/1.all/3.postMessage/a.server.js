const express = require('express');

const app = express();

app.use(express.static(__dirname))

app.listen(3002, function() {
  console.log('a服务启动')
})