import React, { Component } from 'react';
import { bindActionCreators } from '../redux';
import store from '../store';
import * as types from '../store/action-types';


// actionCreators 创建action的函数
function add(payload) {
  return {type: types.ADD, payload};
}
function minus(payload) {
  return {type: types.MINUS, payload}
}

// bindActionCreators 绑定actionCreators  将actionCreators和对应dispach自动绑定在一起,返回一个绑定之后的函数
// 方式1:
// let increase = bindActionCreators(add, store.dispatch)
// let decrease = bindActionCreators(minus, store.dispatch)

// 方式2:
let actions = {add, minus};
actions = bindActionCreators(actions, store.dispatch)


class Counter extends Component {
  constructor() {
    super();
    this.state = {
      number: store.getState().number
    }
  }

  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.setState({number: store.getState().number})
    })
  }
  
  componentWillUnmount() {
    this.unSubscribe();  // 如果不销毁订阅，当前组件注销之后，number在被调用状态进行赋值的时候，依旧会触发监听函数，这时候会执行回调函数，此时this不存在这时候就会报错
  }
  
  render() {
    return (
      <div>
        <p>{store.getState().number}</p>
        <button onClick={() => actions.add(2)}>+</button>
        <button onClick={() => actions.minus(3)}> -</button>
      </div>
    )
  }
}

export default Counter;

/**
 * () => store.dispatch({type: types.MINUS})
 * 优化
 * actionCreator出现了，简化action的创建
 * ==>
 * () => store.dispatch(minus())
 * 
 * 目前还存在问题 
 * 1. actionCreator函数申明和，bindActionCreator将actionCreator和dispatch之间进行绑定这个步骤是必须的
 * 2. 组件的state和store之间进行的绑定是必须的
 * 3. 组件的订阅和取消订阅
 */