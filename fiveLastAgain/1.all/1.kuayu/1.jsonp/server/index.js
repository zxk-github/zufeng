const express = require('express');

const app = express();
app.use(express.static(__dirname))

app.get('/data', function(req, res) {
  let cb = req.query.cb;
  console.log(cb)
  res.end(`${cb}('aaaaa')`)
})

app.listen(3001, function() {
  console.log('server start')
})  