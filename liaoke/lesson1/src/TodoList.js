import React, {Component} from 'react';
// import Head from './todolist/Head';
// import Foot from './todolist/Foot';
import List from './todolist/List';



class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      lists: [
        {id: 1, title: '111111', finished: false},
        {id: 2, title: '222222', finished: false},
        {id: 3, title: '333333', finished: false},
        {id: 4, title: '444444', finished: false}
      ]
    }
  }
  render() {
    const {lists} = this.state;
    return (
      <div>
        <List lists={lists}></List>
      </div>
    )
  }
}

export default TodoList;