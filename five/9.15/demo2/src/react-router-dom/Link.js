import React from 'react';
import context from './context';

export default class Link extends React.Component {
  static contextType = context;
  constructor() {
    super();
  }

  render() {
    let { to } = this.props;
    return (
      <a onClick={() => {
        this.context.history.push(to);
      }}>{this.props.children}</a>
    )
  }
}

