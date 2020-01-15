let express = require('express');

let app = express();
app.get('/data', (req, res) => {
  let {wd, cb} = req.query;
  console.log(cb);
  res.send(`${cb}('aaa')`)
})

app.listen(3002, () => {
  console.log("服务启动")
})
