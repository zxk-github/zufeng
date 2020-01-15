const express = require('express');

const app = express();

const router = express.Router();

router.get('/add', function(req, res, next) {
  res.send({add: 1})
})

router.get('/delete', function(req, res, next) {
  res.send({delete: 1})
})

app.use('/user', router)

app.listen(5001, function() {
  console.log('sever start')
})
