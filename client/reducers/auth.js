import { handleActions } from 'redux-actions'
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../actions/auth';
import jwtDecode from 'jwt-decode';


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: 'Chen Before Auth'
}

export default handleActions({
  [LOGIN_USER_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': 'Chen is authenticating'
    });
  },
  [LOGIN_USER_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': action.payload.token,
      'userName': jwtDecode(action.payload.token).userName,
      'statusText': 'You have been successfully logged in.'
    });

  },
  [LOGIN_USER_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
    });
  },
  [LOGOUT_USER]: (state, action) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'statusText': 'You have been successfully logged out.'
    });
  }
}, initialState)
