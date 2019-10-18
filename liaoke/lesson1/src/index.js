import React from 'react';
import ReactDOM from 'react-dom';

import Message from './message';
import Lefcycle from './lefcycle';
import TodoList from './TodoList';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      age: 1
    }
    this.myP = React.createRef();
  }

  // 固定写法, 设置props属性的默认值
  static defaultProps = {  // 外界传入就是一个隐式传递，没有传就会使用这里面的
    name: 'Tom',
    gender: 'fale'
  };

  // 约束props属性的类型
  // static propTypes = {
  //   name: propTypes.String
  // }

  render() {
    const {name, gender} = this.props;
    const {age} = this.state;
    return (
      <div >
        <p ref={this.myP}>狗名: {name}</p>
        <p onClick={this.click}>年龄: {age}</p>
      </div>
    )
  }
  click = () =>  {
    console.log(this.myP)
    console.log(this.myP.current.innerHTML)
  }
}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
