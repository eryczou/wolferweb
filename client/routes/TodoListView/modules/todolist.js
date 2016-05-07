
//Action
let id = 1;

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: id++,
    completed: false,
    text
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const deleteTodo = (id) => {
  return {
    type: 'DELETE_TODO',
    id
  }
}

export const actions = {
  addTodo,
  toggleTodo,
  deleteTodo
}

const initialState = {
  todos: [{
    text: 'initial text',
    completed: false,
    id:0
  }]
}

//Reducer
<<<<<<< HEAD:client/routes/TodoListView/modules/todoList.js
const todoListReducer = (state = initialState ,action) => {
  switch(action.type) {
=======
export default function todolistReducer(state = initialState, action) {
  switch (action.type) {
>>>>>>> wolferian/master:client/redux/modules/todolist.js
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [{
          text: action.text,
          id: action.id
        }, ...state.todos]
      })
    case 'TOGGLE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          return todo.id === action.id ? Object.assign({}, todo, {completed: !todo.completed}) : todo;
        })
      })
    case 'DELETE_TODO':
      return Object.assign({},state, {
        todos: state.todos.filter((todo)=>{
          return todo.id !== action.id;
        })
      })
    default:
      return state;
  }
}

export default todoListReducer
