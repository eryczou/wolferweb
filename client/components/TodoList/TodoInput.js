import React from 'react';
import { addTodo } from '../../redux/modules/todolist_redux'

export default class TodoInput extends React.Component {
  constructor() {
    super();
    this.state={text:''}
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(addTodo(this.state.text));
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange.bind(this)}placeholder='Please type in your todo item' />
        <button onClick={this.handleSubmit.bind(this)}> Submit </button>
      </div>
    )
  }
}
