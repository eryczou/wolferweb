/* @flow */
import { routeActions } from 'react-router-redux'
import { checkHttpStatus, parseJSON } from '../../utils/webUtils'
import { actions as sidebarActions } from './sidebar'
import { jwtDecode } from 'koa-jwt'

// ------------------------------------
// Constants
// ------------------------------------
export const ISSUE_AUTH_REQUEST = 'ISSUE_AUTH_REQUEST'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'

// ------------------------------------
// Actions
// ------------------------------------

export const loginUserSuccess = (payload): Action => {
  localStorage.setItem('token', payload.token)
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: payload.token,
      user: payload.user
    }
  }
}

export const loginUserFailure = (error): Action => {
  localStorage.removeItem('token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export const issueAuthRequest = (): Action => {
  return {
    type: ISSUE_AUTH_REQUEST
  }
}

export const loginUser = (email, password, redirect='/') => {
  return function(dispatch, getState) {
    dispatch(issueAuthRequest())
    let state = getState()

    return fetch(`${__NODE_API_URL__}/auth/login`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        try {
          dispatch(loginUserSuccess(response.payload))
          let toLocation = state.router.location.query.fromLoc
          if (toLocation) {
            dispatch(routeActions.push(`${toLocation}`))
          }
        } catch (e) {
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: `The username and password pair do not matched!`
            }
          }))
        }
      })
      .catch((error) => {
        dispatch(loginUserFailure(error))
      })
  }
}

export const registerUser = (email, password, redirect='/') => {
  return (dispatch, getState) => {
    dispatch(issueAuthRequest())
    let state = getState()

    return fetch(`${__NODE_API_URL__}/auth/register`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        try {
          dispatch(loginUserSuccess(response.payload))
          let toLocation = state.router.location.query.fromLoc
          if (toLocation) {
            dispatch(routeActions.push(`${toLocation}`))
          }
        } catch (e) {
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: `The username and password pair do not matched!`
            }
          }))
        }
      })
      .catch((error) => {
        dispatch(loginUserFailure(error))
      })
  }
}

export const logout = (): Action => {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER
  }
}

export const logoutAndRedirect = () => {
  return (dispatch, state) => {
    dispatch(logout())
    dispatch(routeActions.push('/'))
    dispatch(sidebarActions.showSidebar())
  }
}

export const isLoggedIn = () => {
  return (dispatch, getState) => {
    let state = getState()
    let token = localStorage.getItem('token')
    let curLocation = state.router.location.pathname
    if (state.auth.isAuthenticated && token) {
      fetch(`${__NODE_API_URL__}/auth/validateToken`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((response) => {
          let toLocation = state.router.location.query.fromLoc
          if (toLocation) {
            dispatch(routeActions.push(`/${toLocation}`))
          }
        })
        .catch((error) => {
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Please login to access the protected content'
            }
          }))
          dispatch(routeActions.push(`/?fromLoc=${curLocation}`))
          dispatch(sidebarActions.showSidebar())
        })
    } else {
      dispatch(loginUserFailure({
        response: {
          status: 403,
          statusText: 'Please login to access the protected content'
        }
      }))
      dispatch(routeActions.push(`/?fromLoc=${curLocation}`))
      dispatch(sidebarActions.showSidebar())
    }
  }
}

export const actions = {
  loginUserSuccess,
  loginUserFailure,
  issueAuthRequest,
  loginUser,
  registerUser,
  logout,
  logoutAndRedirect,
  isLoggedIn
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ISSUE_AUTH_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      isRequesting : true,
      statusText : 'You are authenticating'
    })
  },
  [LOGIN_USER_SUCCESS]: (state, { payload }) => {
    return Object.assign({}, state, {
      isRequesting : false,
      isAuthenticated : true,
      token : payload.token,
      user : payload.user,
      statusText : `${payload.user.username} have been successfully logged in.`
    })
  },
  [LOGIN_USER_FAILURE]: (state, { payload }) => {
    return Object.assign({}, state, {
      isRequesting: false,
      isAuthenticated: false,
      token: null,
      user: null,
      statusText: `Login Status: (${payload.status}) ${payload.statusText}`
    })
  },
  [LOGOUT_USER]: (state, action) => {
    return Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      user: null,
      statusText: 'You have been successfully logged out.'
    })
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isRequesting: false,
  statusText: 'You Before Auth'
}

export default function authReducer (state: obj = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
