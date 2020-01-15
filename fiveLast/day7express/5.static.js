const express = require('express');

const app = express();

app.use(express.static(__dirname));

// 同时内部在req/res上增加了一些方便好用的方法
app.get('/', (req, res, next) => {
  // res.send res.json res.sendFile(path.resolve)
  res.send({a: 1})
})

app.listen(5001, function() {
  console.log('server start')
})



