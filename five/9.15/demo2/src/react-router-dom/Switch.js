import React, { Component } from 'react'
import context from './context';
import pathToRegExp from "path-to-regexp";

export default class Switch extends Component {
  static contextType = context;
  render() {
    let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    for(let i = 0; i< children.length; i++) { 
      let child = children[i]; //此时是虚拟dom 不是组件
      let {path='/', exact=false} = child.props;
      let {pathname} = this.context.location; // 当前请求的路径
      let reg = pathToRegExp(path, [], {end: exact});
      if(reg.test(pathname)) { // 如果匹配到直接停止匹配
        return child;
      }
    }
    return null;
  }
}
