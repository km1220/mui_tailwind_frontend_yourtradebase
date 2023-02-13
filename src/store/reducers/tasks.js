import { SET_TASKS, ADD_ITEM_IN_TASKS, UPDATE_ITEM_IN_TASKS, REMOVE_ITEM_IN_TASKS } from '@store/actions/ActionTypes';

const initialState = [];

let buffAddedList;
let buffUpdatedList;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return [...action.payload];
    case ADD_ITEM_IN_TASKS:
      buffAddedList = state;
      buffAddedList.push(action.payload);
      return [...buffAddedList];
    case UPDATE_ITEM_IN_TASKS:
      buffUpdatedList = state.map(each => each.id === action.payload.id ? action.payload : each);
      return [...buffUpdatedList];
    case REMOVE_ITEM_IN_TASKS:
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
