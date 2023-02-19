import { SET_ALL_USER_INFO, RESET_USER_INFO } from '../actions/ActionTypes';

const initialState = {
  id: 1,
  name: 'vladmir rudic',
  email: 'vlad******@gmail.com',
  password: '123',

  from_name: 'VR',
  reply_to_email: '2@2.com',
  signature: 'vald rudic, signature !!!',
  timezone: 'New York',

  reminder: {
    quote_unsent: 3,
    quote_need_follow_up: 7,
    invoice_unsent: 3,
    invoice_overdue: 7,
    summary_daily_email: true,
    summary_weekly_email: true,
    all_unsubscribe: false,
  }
};

export default function user_info(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_USER_INFO:
      return {
        ...state,
        // full_name: action.payload.name,
        // email: action.payload.email,
        ...action.payload
      };
    case RESET_USER_INFO:
      return {
        ...state,
        full_name: undefined,
        email: undefined,
      };


    default:
      return state;
  }
}
