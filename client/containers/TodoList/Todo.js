import React from 'react';
import TodoInput from '../../components/TodoList/TodoInput'
import TodoList from '../../components/TodoList/TodoList'
import { connect } from 'react-redux'

class Todo extends React.Component {
  render(){
    return(
      <div>
        <TodoInput dispatch={this.props.dispatch}/>
        <TodoList todos={this.props.todolist_reducer.todos}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Todo)

