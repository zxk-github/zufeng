const app  = {
  middlewares: [],
  use(cb) {
    this.middlewares.push(cb);
  }
}

app.use(function(req, res, next) {
  console.log(1);
  next();
  console.log(2);
})

app.use(function(req, res, next) {
  console.log(3);
  // next();
  console.log(4);
})

app.use(function(req, res, next) {
  console.log(5);
  next();
  console.log(6);
})

function dispatch(index) {
  if(index === app.middlewares.length) return; 
  let middleware = app.middlewares[index];
  return middleware({}, {}, () => dispatch(index+1));
}
dispatch(0)