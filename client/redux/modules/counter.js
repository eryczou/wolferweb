import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

// ------------------------------------
// Actions
// ------------------------------------
export const increment = createAction(INCREMENT_COUNTER, (value = 1) => value)
export const decrement = createAction(DECREMENT_COUNTER, (value = 1) => value)

export const incrementFromServer = () => (dispatch) => {
  axios.get('http://localhost:3000/api/counter/random-increment')
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
