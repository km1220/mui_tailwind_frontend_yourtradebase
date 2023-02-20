import { SET_ALERT, RESET_ALERT } from '../actions/ActionTypes';

const initialState = {
	open: false,
	type: null,
	message: null,
	time: 3000
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ALERT:
			return {
				open: true,
				type: action.payload.type,
				message: action.payload.message,
				time: action.payload.time ? action.payload.time : 3000
			};
		case RESET_ALERT:
			return initialState;
		default:
			return state;
	}
}
