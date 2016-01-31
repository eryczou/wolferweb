import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import sidebar from './modules/sidebar'
import auth from './modules/auth'
import clusterDoc from './modules/clusterDoc'

export default combineReducers({
  counter,
  sidebar,
  auth,
  clusterDoc,
  router
})

