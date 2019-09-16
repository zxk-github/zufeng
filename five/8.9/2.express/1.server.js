// 内部继承了路由系统
// 内置中间件 

const express = require('express');

const app = express();

app.use('/user', (req, res, next) => {
    console.log(1);
    // next('223');
    console.log(2);
})
app.use('/',(req, res, next) => {
    console.log(3);
    next();
    console.log(4);
})
app.use((req, res, next) => {
    console.log(5);
    next();
    console.log(6);
})
app.use((err, req, res, next) => {
    console.log(err);
})



app.listen(4000)

