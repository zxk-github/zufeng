const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.listen(4001, function() {
  console.log('b服务启动')
})