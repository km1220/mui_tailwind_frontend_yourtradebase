import { SET_ALL_USER_INFO, RESET_USER_INFO } from '../actions/ActionTypes';

const initialState = {
  email_addr: 'vlad******@gmail.com',
  full_name: 'Vlad',
};

export default function user_info(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_USER_INFO:
      return {
        ...state,
        // full_name: action.payload.name,
        // email_addr: action.payload.email,
        ...action.payload
      };
    case RESET_USER_INFO:
      return {
        ...state,
        full_name: undefined,
        email_addr: undefined,
      };


    default:
      return state;
  }
}
