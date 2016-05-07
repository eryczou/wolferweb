import React from 'react';
<<<<<<< HEAD:client/routes/TodoListView/containers/TodoList.js
import { addTodo } from '../modules/todoList'
=======
import { actions as TodoActions} from '../../redux/modules/todolist'
>>>>>>> wolferian/master:client/containers/TodoList/Todo.js
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import classes from './Todo.scss'

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
    this.props.actions.addTodo(this.state.text);
  }

  handleTodoComplete(id) {
    this.props.actions.toggleTodo(id);
  }

  handleTodoDelete(id) {
    this.props.actions.deleteTodo(id);
  }

  render(){
    return(
      <div>
        <input onChange={this.handleChange.bind(this)}placeholder='Please type in your todo item' />
        <button onClick={this.handleSubmit.bind(this)}> Submit </button>
        <ul>
          {
<<<<<<< HEAD:client/routes/TodoListView/containers/TodoList.js
            this.props.todoList.todos.map((todo) => {
              return <li>{todo.text}</li>
=======
            this.props.todolistReducer.todos.map((todo) => {
            let currentID = todo.id;
            return (
                  <div>
                    <li className={todo.completed ?classes.strikethrough:''}>{todo.text}</li>
                    <button onClick={()=>this.handleTodoComplete(currentID)}>Complete</button>
                    <button onClick={()=>this.handleTodoDelete(currentID)}>Delete</button>
                  </div>
              )
>>>>>>> wolferian/master:client/containers/TodoList/Todo.js
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

function mapPropsToDispatch(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Todo)

