let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');

let app = express();

let userList = [{
  username: 'zfpx',
  password: 'zfpx'
}]
let SESSION_ID = 'connect.sid'
let session = {

}
app.use(express.static(path.join(__dirname)))
app.use(bodyParser.urlencoded({extended: true})) // a=1&b=2 ==> {a: 1, b: 2}

app.post('api/login', function(req, res) {
  let {username, password} = req.body;
  let user = userList.find(user => {
    return user.username === username && user.password === password;
  })
  if(user) {
    // 服务器需要在用户登陆后做一个标记信息
    let cardId = Math.random() + Date.now(); 
    session[cardId] = {user}
    res.cookie(SESSION_ID, cardId, {httpOnly: true})  // 加了httpOnly之后 前端代码不能读取修改对应的cookie值
    res.json({code: 0})
  } else {
    res.json({code: 1, error: '用户不存在'})
  }
})
// 反射型 chrome发现路径存在异常 会出现错误提示 但是firfox IE不会  xss攻击
app.get('/welcome', function(req, res) {
  res.send(`${req.query.type}`)
})

app.listen(3000)




