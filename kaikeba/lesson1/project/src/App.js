import React, {Component} from 'react';
import Clock from './1.Clock';
import HOC1 from './2.HOC1';

class App extends Component {
  constructor() {
    super();    
    this.state = {
      user: '12'
    }
    
  }
  render() {
    return (
      <div onClick={this.update}>
        {/* 注释 */}
        {this.state.user}
        <Clock />
        <HOC1 name="123"/>
      </div>
    )
  }
  update() {
    console.log(this)
  }
  componentDidMount() {
    this.setState({
      user: 13
    })
  }
}

export default App;
