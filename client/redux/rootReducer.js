import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import sidebar from './modules/sidebar'
import auth from './modules/auth'
import clusterDoc from './modules/clusterDoc'
import mde from './modules/mde'

export default combineReducers({
  counter,
  sidebar,
  auth,
  clusterDoc,
  mde,
  router
})

