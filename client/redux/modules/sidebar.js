/* @flow */

// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR'


// ------------------------------------
// Actions
// ------------------------------------
export const toggleSidebar = (): Action => {
  return {
    type: TOGGLE_SIDEBAR
  }
}

export const showSidebar = (): Action => {
  return {
    type: SHOW_SIDEBAR
  }
}

export const actions = {
  toggleSidebar,
  showSidebar
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_SIDEBAR]: (state, { payload }) => {
    const isToggled = !state.isToggled
    return Object.assign({}, state, { isToggled })
  },
  [SHOW_SIDEBAR]: (state, action) => {
    return Object.assign({}, state, { isToggled: false })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isToggled: true
}
export default function sidebarReducer (state: obj = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
