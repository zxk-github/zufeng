import React, { Component } from 'react';
import actions from '../store/actions/counter1'
import {connect} from '../react-redux';
import * as types from '../store/action-types';

// bindActionCreators 绑定actionCreators  将actionCreators和对应dispach自动绑定在一起,返回一个绑定之后的函数
// 方式1:
// let increase = bindActionCreators(add, store.dispatch)
// let decrease = bindActionCreators(minus, store.dispatch)

// 方式2:
// let actions = {add, minus}; 
// actions = bindActionCreators(actions, store.dispatch)
// 每一个都有createAction个dispatch直接的接口绑定

class Counter extends Component {
  constructor() {
    super();
    // this.state = {
    //   number: store.getState().counter1.number
    // }
  }

  // // 所有的都需要组件和store之间的订阅，所以可以提取出来
  // componentDidMount() { 
  //   this.unSubscribe = store.subscribe(() => {
  //     this.setState({number: store.getState().counter1.number})
  //   })
  // }
  
  // // 所有都需要在组件销毁的时候，取消订阅
  // componentWillUnmount() {
  //   this.unSubscribe();  // 如果不销毁订阅，当前组件注销之后，number在被调用状态进行赋值的时候，依旧会触发监听函数，这时候会执行回调函数，此时this不存在这时候就会报错
  // }
  
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={() => this.props.add(2)}>+</button>
        <button onClick={() => this.props.minus(3)}> -</button>
      </div>
    )
  }
}
// 组件和仓库之间需要一个映射，将仓库中的状态映射为组件属性
// 从仓库拿状态，映射为属性，组件可以通过this.props获取对应的属性，显示用
let mapStateToProps = state => state.counter1; //state.counter1 映射为Counter1组件的props
// 像派发动作修改状态树
let mapDispatchToProps = dispatch => (
  {
    add(payload) {
      dispatch({type: types.ADD1, payload})
    },
    minus(payload) {
      dispatch({type: types.MINUS1, payload})
    }
  }
)  //将dispatch方法映射为组件的属性

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Counter);

export default connect(
  mapStateToProps,
  actions
)(Counter);

/**
 * () => store.dispatch({type: types.MINUS})
 * 优化
 * actionCreator出现了，简化action的创建
 * ==>
 * () => store.dispatch(minus())
 */
/**
 * react组件和redux仓库进行自动关联的一个库
 *   
 */
