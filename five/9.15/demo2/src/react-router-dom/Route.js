import React from 'react';
import context from './context';
import pathToRegExp from 'path-to-regexp';


export default class Route extends React.Component {
  static contextType = context
  render() {
    console.log(this.context);
    // 这个pathname属性是当前真正的请求路径
    let pathname = this.context.location.pathname;
    
    // 获取我们定义规则路径和要渲染的组件
    let {path='/', component: Component, exact=true} = this.props;
    let reg = pathToRegExp(path, [], {end: exact});
    let props = {
      ...this.context // context中有location 
    }
    // 如果路径匹配成功 就渲染对应的组件
    if(reg.test(pathname)) {
      return <Component {...props} />
    }

    // 否则不进行渲染操作
    return null;
  }
}