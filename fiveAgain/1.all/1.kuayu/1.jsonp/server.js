const express = require('express');

const app = express();

app.get('/data', (req, res) => {
  res.send('show("hello")')
})