import { SET_LOADING, REMOVE_LOADING } from '../actions/ActionTypes';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return true
    case REMOVE_LOADING:
      return false
    default:
      return state;
  }
}
