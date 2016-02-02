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
export const increment = (value=1) => {
  return {
    type: INCREMENT_COUNTER,
    payload: value
  }
}

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
  dispatch(increment(1));
}

export const incrementAsync = (delay = 1000) => (dispatch) => {
  setTimeout(() => {
    dispatch(increment(1))
  }, delay)
}

export const actions = {
  increment,
  decrement,
  incrementFromServer,
  incrementIfOdd,
  incrementAsync
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;

export default handleActions({
  [INCREMENT_COUNTER]: (state, { payload }) => state + payload,
  [DECREMENT_COUNTER]: (state, { payload }) => state - payload
}, initialState)
