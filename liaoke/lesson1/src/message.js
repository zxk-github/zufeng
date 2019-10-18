import React, {Fragment} from 'react';


function Form(props) {
  return (
    <div >
      <div>
        name: <input name="name" onChange={props.handleChange} value={props.formValue.name} />
      </div>
      <div>
      age: <input name="age" onChange={props.handleChange} value={props.formValue.age} />
      </div>
      <button onClick={props.add}></button>
    </div>
  )
}

function List(props) {
  console.log(props.delete)
  return (
    <ul>
      {props.list.map((item, index) => {
        return (<li key={index}>
            <span>{item.name}</span>
            <span>{item.age}</span>
            <button onClick={() => props.delete(index)}>删除</button>
        </li>)
      })}
    </ul>
  )
}

class message extends React.Component {
  constructor() {
    super()
    this.state = {
      formValue: {
        name: '',
        age: '',
      },
      list: []
    }
  }

  render() {
    return (
      <Fragment>
        <Form formValue={this.state.formValue} handleChange={this.handleChange} add={this.add}/>
        <List list={this.state.list} delete={this.delete}/>
      </Fragment>
    )
  }

  handleChange = (e) => {
    this.setState({
      formValue: {
        ...this.state.formValue,
        [e.target.name]: e.target.value
      }
    })
  }
  add = () => {
    this.state.list.unshift({
      name: this.state.formValue.name,
      age: this.state.formValue.age
    })
    
    this.setState({
      list: this.state.list
    })
  }
  delete = (index) => {
    this.state.list.splice(index, 1);
    this.setState({
      list: this.state.list
    })
  }
}

export default message;
