var express = require('express');
var app = express();

app.use('/api/*', function(req, res) {
  res.send('hello 1')
})
app.use(/^\/(sshowcase)|(sitem).*$/, function(req, res){
  res.send('hello world');
});

app.listen(3000);

// let reg = /^\/(sshowcase)|(sitem)\/.*$/
// console.log(reg.test('/sitem1/a/aa'))