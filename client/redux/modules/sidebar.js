import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR'


// ------------------------------------
// Actions
// ------------------------------------
export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  }
}

export function showSidebar() {
  return {
    type: SHOW_SIDEBAR
  }
}

export const actions = {
  toggleSidebar,
  showSidebar
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isToggled: true
}

export default handleActions({
  [TOGGLE_SIDEBAR]: (state, { payload }) => {
    const isToggled = !state.isToggled
    return Object.assign({}, state, { isToggled })
  },
  [SHOW_SIDEBAR]: (state, action) => {
    return Object.assign({}, state, { isToggled: false })
  }
}, initialState)
