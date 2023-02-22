import { SET_USER_NOTIFICATIONS, RESET_USER_NOTIFICATIONS } from '../../actions/ActionTypes';


const initialState = {
  // user_id: 0,
  quoteAccepted: [],
  onlinePaymentReceived: [],
  quoteReplyReceived: [],
  invoiceReplyReceived: [],
  jobReplyReceived: [],
  customerReplyReceived: [],
  fieldTeamCreatesNote: [],
  fieldTeamUploadsFile: [],
  fieldTeamCapturesJobSignature: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload
      };
    case RESET_USER_NOTIFICATIONS:
      return {
        ...initialState
      };


    default:
      return state;
  }
}
