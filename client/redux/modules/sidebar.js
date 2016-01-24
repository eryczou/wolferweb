import { createAction, handleActions } from 'redux-actions'
import 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'


// ------------------------------------
// Actions
// ------------------------------------
export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  }
}

export const actions = {
  toggleSidebar
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isToggled: true
}

export default handleActions({
  [TOGGLE_SIDEBAR]: (state, { payload }) => {
    const isToggled = !state.isToggled;
    return Object.assign({}, state, { isToggled });
  }
}, initialState)
