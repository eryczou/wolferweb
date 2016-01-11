import 'immutable';
import { TOGGLE_SIDEBAR } from '../actions/sidebar'

const initialState = {
  toggle: true
};

function toggleSidebar(state){
  const toggle = !state.toggle;
  return Object.assign({}, state, toggle);
}

export default function sidebar(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return toggleSidebar(state);
    default:
      return state
  }
}
