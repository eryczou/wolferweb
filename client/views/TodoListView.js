import React from 'react';
import Todo from '../containers/TodoList/Todo'

class TodoListView extends React.Component {
  constructor() {
    super();
  }

  render(){
    return(
      <div>
        <Todo />
      </div>
    )
  }
}

export default TodoListView

