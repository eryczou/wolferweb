import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './counter'
import sidebar from './sidebar'
import auth from './auth'
import data from './data'

export default combineReducers({
  counter,
  sidebar,
  auth,
  data,
  router
});

