import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import sidebar from './modules/sidebar'
import auth from './modules/auth'
import post from './modules/post'
import mde from './modules/mde'
import todolist_reducer from './modules/todolist_redux'

export default combineReducers({
  counter,
  sidebar,
  auth,
  post,
  mde,
  router,
  todolist_reducer
})

