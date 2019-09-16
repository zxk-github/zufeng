import React, { Component } from 'react'

export default class Clock extends Component {
  // constructor() {
  //   super();
  //   this.state = {time: new Date()}
  // }
  state = {time: new Date(), counter: 1}

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({time: new Date()})
    }, 1000)
    this.setState({counter: this.state.counter + 1});
    this.setState({counter: this.state.counter + 1});
    this.setState({counter: this.state.counter + 1}, (prev) => {
      console.log(this.state.counter) // 在setState的第二个回调函数中，也可以获取到最新的值
    });  

    // 显示出来的2,因为批量操作同一个key的操作，将来只会执行一次
    // console出来的值是1，因为setState的操作是可能是异步的
    console.log(this.state.counter);
    // setState回调函数中获取原生模块的值
    this.setState((prev) => {
      console.log(prev.counter)
      return prev.counter;
    })
    // 原生事件中获取当前状态的值
    setTimeout(() => {
      this.setState({counter: this.state.counter + 1}); 
      console.log(this.state.counter)
    },0)
    document.body.addEventListener('click', this.changeCounter.bind(this), false);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  changeCounter() {
    this.setState({counter: this.state.counter + 1}); 
    console.log('--->', this.state.counter)
  }



  render() {
    return (
      <div>
        {this.state.time.toString()}
        {this.state.counter}
      </div>
    )
  }
}
