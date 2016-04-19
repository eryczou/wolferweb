import React from 'react';
import { addTodo } from '../../redux/modules/todolist'
import { connect } from 'react-redux'

class Todo extends React.Component {
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

  render(){
    return(
      <div>
        <input onChange={this.handleChange.bind(this)}placeholder='Please type in your todo item' />
        <button onClick={this.handleSubmit.bind(this)}> Submit </button>
        <ul>
          {
            this.props.todolistReducer.todos.map((todo) => {
              return <li>{todo.text}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Todo)

