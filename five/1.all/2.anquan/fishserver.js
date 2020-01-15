let express = require('express');

let app = express();

app.use(express.static(__dirname))

app.listen(3006, function() {
  console.log('钓鱼服务启动')
})