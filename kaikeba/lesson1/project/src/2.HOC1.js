import React, { Component } from 'react';

function Kakeba(props) {
  return <div>{props.stage} - {props.name}</div>
}
// 创建一个函数，传入一个组件，返回另一个组件 
const withStage = (Component) => {
  return function(props) {
    return <Component {...props} stage="1" />
  }
}

export default withStage(Kakeba);