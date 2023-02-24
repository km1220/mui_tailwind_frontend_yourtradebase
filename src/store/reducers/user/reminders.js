import { SET_USER_REMINDERS, RESET_USER_REMINDERS } from '../../actions/ActionTypes';


const initialState = {
  quoteUnsent: 7,
  quoteNeedFollowUp: 7,
  invoiceUnsent: 7,
  invoiceOverdue: 7,
  summaryDailyEmail: true,
  summaryWeeklyEmail: false,
  allUnsubscribe: true
};



export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_REMINDERS:
      return {
        ...state,
        ...action.payload
      };
    case RESET_USER_REMINDERS:
      return initialState;


    default:
      return state;
  }
}
