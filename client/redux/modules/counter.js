/* @flow */
import { checkHttpStatus, parseJSON } from '../../utils/webUtils'
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

export const decrement = (value: number = 1): Action => ({
  type: DECREMENT_COUNTER,
  payload: value
})

export const incrementFromServer = () => (dispatch) => {
  fetch(`${__NODE_API_URL__}/test/random-increment`, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((res) => {
        dispatch(increment(res.increment))
      })
    .catch(::console.log)
}

export const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState()
  if (counter % 2 === 0) {
    return
  }
  dispatch(increment(1))
}

export const doubleAsync = () => (dispatch, getState) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(increment(getState().counter))
      resolve()
    }, 200)
  })
}

export const actions = {
  increment,
  decrement,
  incrementFromServer,
  incrementIfOdd,
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
