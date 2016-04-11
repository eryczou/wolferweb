import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import sidebar from './modules/sidebar'
import auth from './modules/auth'
import post from './modules/post'
import mde from './modules/mde'

export default combineReducers({
  counter,
  sidebar,
  auth,
  post,
  mde,
  router
})

