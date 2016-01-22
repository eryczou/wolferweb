import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import sidebar from './modules/sidebar'
import auth from './modules/auth'
import data from './modules/data'

export default combineReducers({
  counter,
  sidebar,
  auth,
  data,
  router
});

