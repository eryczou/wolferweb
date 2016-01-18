import axios from 'axios'

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}

export const incrementFromServer = () => (dispatch) => {
  axios.get('http://localhost:3000/api/counter/random-increment')
    .then((res) => dispatch(increment(res.data.increment)))
    .catch(::console.log)
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState()
    if (counter % 2 === 0) {
      return
    }

    dispatch(increment());
  }
}

export function incrementAsync(delay = 1000) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}
