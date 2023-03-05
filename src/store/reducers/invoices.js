import { SET_INVOICES, RESET_INVOICES, ADD_ITEM_IN_INVOICES, UPDATE_ITEM_IN_INVOICES, REMOVE_ITEM_IN_INVOICES } from '@store/actions/ActionTypes';

const initialState = null;

let buffAddedList;
let buffUpdatedList;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICES:
      return [...action.payload];
    case RESET_INVOICES:
      return initialState;
    case ADD_ITEM_IN_INVOICES:
      buffAddedList = state;
      buffAddedList.push(action.payload);
      return [...buffAddedList];
    case UPDATE_ITEM_IN_INVOICES:
      buffUpdatedList = state.map(each => each.id === action.payload.id ? action.payload : each);
      return [...buffUpdatedList];
    case REMOVE_ITEM_IN_INVOICES:
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
