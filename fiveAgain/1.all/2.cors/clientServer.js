let express = require('express');

let app = express();

app.use(express.static(__dirname));
app.listen(3002, function() {
  console.log('服务启动')
})