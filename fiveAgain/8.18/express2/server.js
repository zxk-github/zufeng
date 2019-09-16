const express = require('./index');

const app = express();

app.get('/user', function(req, res, next) {
  res.end('23123');
})
app.listen(4001);
