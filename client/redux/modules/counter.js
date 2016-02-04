/* @flow */
import { handleActions } from 'redux-actions'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

// ------------------------------------
// Actions
// ------------------------------------
export const increment = (value: number = 1): Action => ({
  type: INCREMENT_COUNTER,
  payload: value
})

export const decrement = (value=1) => {
  return {
    type: DECREMENT_COUNTER,
    payload: value
  }
}

export const incrementFromServer = () => (dispatch) => {
  axios.get(`${__NODE_API_URL__}/test/random-increment`)
    .then((res) => dispatch(increment(res.data.increment)))
    .catch(::console.log)
}

export const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState()
  if (counter % 2 === 0) {
    return
  }
  dispatch(increment(1))
}

export const incrementAsync = (delay = 1000) => (dispatch) => {
  setTimeout(() => {
    dispatch(increment(1))
  }, delay)
}

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  decrement,
  incrementFromServer,
  incrementIfOdd,
  incrementAsync,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INCREMENT_COUNTER]: (state, {payload}) => state + payload,
  [DECREMENT_COUNTER]: (state, { payload }) => state - payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state: number = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
