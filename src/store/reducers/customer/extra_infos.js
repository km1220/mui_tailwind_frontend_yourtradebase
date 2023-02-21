import { SET_CUSTOMER_EXTRA_INFOS, ADD_ITEM_IN_CUSTOMER_EXTRA_INFOS, UPDATE_ITEM_IN_CUSTOMER_EXTRA_INFOS, REMOVE_ITEM_IN_CUSTOMER_EXTRA_INFOS } from '@store/actions/ActionTypes';

const initialState = [];

let buffAddedList;
let buffUpdatedList;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_EXTRA_INFOS:
      return [...action.payload];
    case ADD_ITEM_IN_CUSTOMER_EXTRA_INFOS:
      buffAddedList = state;
      buffAddedList.push(action.payload);
      return [...buffAddedList];
    case UPDATE_ITEM_IN_CUSTOMER_EXTRA_INFOS:
      buffUpdatedList = state.map(each => each.id === action.payload.id ? action.payload : each);
      return [...buffUpdatedList];
    case REMOVE_ITEM_IN_CUSTOMER_EXTRA_INFOS:
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
