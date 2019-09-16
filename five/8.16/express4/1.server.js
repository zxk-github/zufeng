const express = require('./index');

const app = express();

app.use('/', function(req, res, next){
    console.log(1)
    next()
})
app.use('/user', function(req, res, next){
    console.log(2)
    next()
})
app.get('/user', function(req, res, next){
    console.log(3)
    next()
})
app.get('/user', function(req, res, next){
    console.log(4)
    next()
})

app.listen(4000);


