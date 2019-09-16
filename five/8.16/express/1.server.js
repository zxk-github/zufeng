const express = require('./index');

const app = express();

app.get('/user', function(req, res){
    res.end('123')
})

app.listen(4000);


