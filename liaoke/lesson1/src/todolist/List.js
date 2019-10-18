import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Item from './Item';

export default class List extends Component {
  static propTypes = {
    lists: PropTypes.array.isRequired 
  }
  render() {
    const {lists} = this.props;
    return (
      <ul>
        {
          lists.map((todo) => (
            <Item key={todo.id} todo={todo}></Item>
          ))
        }
      </ul>
    )
  }
}
