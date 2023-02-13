import { SET_LABOURS, ADD_ITEM_IN_LABOURS, UPDATE_ITEM_IN_LABOURS, REMOVE_ITEM_IN_LABOURS } from '@store/actions/ActionTypes';

const initialState = [];

let buffAddedList;
let buffUpdatedList;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LABOURS:
      return [...action.payload];
    case ADD_ITEM_IN_LABOURS:
      buffAddedList = state;
      buffAddedList.push(action.payload);
      return [...buffAddedList];
    case UPDATE_ITEM_IN_LABOURS:
      buffUpdatedList = state.map(each => each.id === action.payload.id ? action.payload : each);
      return [...buffUpdatedList];
    case REMOVE_ITEM_IN_LABOURS:
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
