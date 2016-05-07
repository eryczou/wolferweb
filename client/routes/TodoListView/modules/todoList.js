//Action
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  }
}

const initialState = {
  todos:[{
    text:'initial text'
  }]
}

//Reducer
const todoListReducer = (state = initialState ,action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [{
          text: action.text
        }, ...state.todos]
      })
    default:
      return state;
  }
}

export default todoListReducer
