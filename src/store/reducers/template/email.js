import { SET_TEMPLATE_EMAILS, ADD_ITEM_IN_TEMPLATE_EMAILS, UPDATE_ITEM_IN_TEMPLATE_EMAILS, REMOVE_ITEM_IN_TEMPLATE_EMAILS } from '@store/actions/ActionTypes';

const initialState = [];

let buffAddedList;
let buffUpdatedList;
export default (state = initialState, action) => {
	switch (action.type) {
		case SET_TEMPLATE_EMAILS:
			return [...action.payload];
		case ADD_ITEM_IN_TEMPLATE_EMAILS:
			buffAddedList = state;
			buffAddedList.push(action.payload);
			return [...buffAddedList];
		case UPDATE_ITEM_IN_TEMPLATE_EMAILS:
			buffUpdatedList = state.map(each => each.id === action.payload.id ? action.payload : each);
			return [...buffUpdatedList];
		case REMOVE_ITEM_IN_TEMPLATE_EMAILS:
			buffUpdatedList = state;
			for (let i = 0; i < buffUpdatedList.length; i++) {
				if (buffUpdatedList[i].id === action.payload) {
					buffUpdatedList.splice(i, 1);
					break;
				}
			}
			return [...buffUpdatedList];

		default:
			return state;
	}
}
