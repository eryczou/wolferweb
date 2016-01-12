import 'immutable';
import { TOGGLE_SIDEBAR } from '../actions/sidebar'

const initialState = {
  isToggled: false
};

function toggleSidebar(state){
  console.log('chen' + state);
  const isToggled = !state.isToggled;
  return Object.assign({}, state, { isToggled });
}

export default function sidebar(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return toggleSidebar(state);
    default:
      return state
  }
}
