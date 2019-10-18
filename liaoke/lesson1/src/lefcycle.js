import React, { Component } from 'react'

export default class Lefcycle extends Component {
  constructor() {
    super();
    this.state = {
      text: 112
    }
  }
  render() {
    return (
      <div>
        {this.state.text}
      </div>
    )
  }
  componentWillMount() {
    this.setState({
      text: '121211'
    })
  }
}
