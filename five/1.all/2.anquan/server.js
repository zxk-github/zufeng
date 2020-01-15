const express = require('express');
let cookieParser = require('cookie-parser');
let svgCaptcha = require('svg-captcha')

const app = express();

let userlist = [
  {username: 'zf', password: 'zf', money: 1000},
  {username: 'zxk', password: 'zxk', money: 0 }
]
let SESSON_ID = 'connect.sid';
let session = {};

app.use(express.static(__dirname));
app.use(cookieParser())
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/login', function(req, res) {
  let {username, password} = req.body;

  let user = userlist.find(user => user.username === username && user.password === password)
  if(user) {
    //  服务器需要在用户登陆之后 给一个信息
    let cardId = Math.random()+Date.now();
    session[cardId] = {user};
    res.cookie(SESSON_ID, cardId)
    res.json({code: 0});
  } else {
    res.json({code: 1, error: '用户不存在'})
  } 
})


/**
 * 1.反射形
 * 用户输入什么服务器返回什么
 * chrome发现get 路径有xss的可能的时候，会进行屏蔽
 */
app.get('welcome', function(req, res) {
  let {type} = req.query;
  res.send(`${type}`)
})

let comments = [
  {username: 'zf', content: 'study'}
]
app.get('/api/list', function(req, res) {
  res.json({code: 0, comments})
})

app.post('/api/addContent', function(req, res) {
  let r = session[req.cookies[SESSON_ID]] || {};
  let user = r.user
  if(user) {
    comments.push({username: user.username, content: req.body.content})
    res.json({code: 0})
  } else {
    res.json({code: 1, message: '用户未登陆'})
  }
})

app.get('/api/userInfo', function(req, res) {
  let r = session[req.cookies[SESSON_ID]] || {};
  let {data, text} = svgCaptcha.create();
  r.text = text; // 下次请求时应该拿到返回的结果和上次存好的结果做对比
  let user = r.user
  if(user) {
    console.log(user.money)
    res.json({code: 0, user: {username: user.username, money: user.money, svg: data}})
  } else {
    res.json({code: 1, message: '用户未登陆'})
  }
})

app.post('/api/transfer', function(req, res) {
  let r = session[req.cookies[SESSON_ID]] || {};
  let user = r.user
  let referer = req.headers['referer'] || '';
  if(!referer.includes('http://localhost:3000')) {
    res.json({code: 1, error: '被人攻击了'})
    return
  }
  if(user) {
    let {code, target, money, token} = req.body;
    if(('my_' + req.cookies[SESSON_ID]) !== token ) {
      res.json({code: 1, error: '被人攻击了'})
      return
    }
    if(code && code === r.text) {
      money = Number(money);
      userlist.forEach(u => {
        if(u.username === user.username) {
          u.money -= money;
        } 
        if(u.username === target) {
          u.money += money
        }
      })
      res.json({code: 0, user: {username: user.username, money: user.money}})
    } else {
      res.json({code: 1, error: '验证码正确'})
    }
    
  } else {
    res.json({code: 1, message: '用户未登陆'})
  }
})
app.listen(3005, () => {
  console.log('启动成功');
})

// csrf 跨站请求伪造