let express = require('express');

let app = express();

app.use(express.static(__dirname));

app.listen(4000, function() {
  console.log('a 服务启动')
})
