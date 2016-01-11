import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './counter'
import sidebar from './sidebar'

export default combineReducers({
  counter,
  sidebar,
  router
});

