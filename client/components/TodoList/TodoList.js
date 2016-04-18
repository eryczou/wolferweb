import React from 'react';

export default class TodoInput extends React.Component {
  render() {
    return (
        <ul>
          {
            this.props.todos.map((todo) => {
              return <li>{todo.text}</li>
            })
          }
        </ul>
    )
  }
}
