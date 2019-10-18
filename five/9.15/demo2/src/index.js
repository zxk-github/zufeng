import React from 'react';
import ReactDOM from 'react-dom';

// react路由需要引入 内部提供了很多组件
// 提供一个路由容器 容器里放着一条条的路由
import Home from './pages/Home';
import User from './pages/User';
import Profile from './pages/Profile';

import {HashRouter as Router, Route, Link} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <nav>
      <Link to={{pathname: '/', state: {title: '呵呵'}}}>首页</Link>
      <Link to="/user">用户</Link>
    </nav>
    <Route path="/" exact={true} component={Home}></Route>
    <Route path="/profile" component={Profile}></Route>
    <Route path="/user" component={User}></Route>
  </Router>
, document.getElementById('root'));
