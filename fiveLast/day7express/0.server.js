const express = require('./express2');

const app = express();

app.get('/', function(req, res) {
  res.end('111')
})

app.listen(5001, function() {
  console.log('serve start')
})

