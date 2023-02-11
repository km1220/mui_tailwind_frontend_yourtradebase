import { SET_PRICE_LISTS, ADD_ITEM_IN_PRICE_LISTS, UPDATE_ITEM_IN_PRICE_LISTS, REMOVE_ITEM_IN_PRICE_LISTS } from '../actions/ActionTypes';

const initialState = [];

let buffAddedList;
let buffUpdatedList;
export default function user_info(state = initialState, action) {
  switch (action.type) {
    case SET_PRICE_LISTS:
      return [...action.payload];
    case ADD_ITEM_IN_PRICE_LISTS:
      buffAddedList = state;
      buffAddedList.push(action.payload);
      return [...buffAddedList];
    case UPDATE_ITEM_IN_PRICE_LISTS:
      buffUpdatedList = state.map(each => each.id === action.payload.id ? action.payload : each);
      return [...buffUpdatedList];
    case REMOVE_ITEM_IN_PRICE_LISTS:
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
