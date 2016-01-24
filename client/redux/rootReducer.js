import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import sidebar from './modules/sidebar'
import auth from './modules/auth'
import data from './modules/data'
import clusterDoc from './modules/clusterDoc'

export default combineReducers({
  counter,
  sidebar,
  auth,
  data,
  clusterDoc,
  router
});

