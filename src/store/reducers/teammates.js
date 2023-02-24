import { SET_TEAMMATES, RESET_TEAMMATES, ADD_ITEM_IN_TEAMMATES, UPDATE_ITEM_IN_TEAMMATES, REMOVE_ITEM_IN_TEAMMATES } from '@store/actions/ActionTypes';

const initialState = null;

let buffAddedList;
let buffUpdatedList;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAMMATES:
      return [...action.payload];
    case RESET_TEAMMATES:
      return initialState;
    case ADD_ITEM_IN_TEAMMATES:
      buffAddedList = state;
      buffAddedList.push(action.payload);
      return [...buffAddedList];
    case UPDATE_ITEM_IN_TEAMMATES:
      buffUpdatedList = state.map(each => each.id === action.payload.id ? action.payload : each);
      return [...buffUpdatedList];
    case REMOVE_ITEM_IN_TEAMMATES:
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
