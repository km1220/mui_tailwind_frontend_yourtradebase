import { SET_JOBS, RESET_JOBS, ADD_ITEM_IN_JOBS, UPDATE_ITEM_IN_JOBS, REMOVE_ITEM_IN_JOBS } from '@store/actions/ActionTypes';

const initialState = null;

let buffAddedList;
let buffUpdatedList;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return [...action.payload];
    case RESET_JOBS:
      return initialState;
    case ADD_ITEM_IN_JOBS:
      buffAddedList = state;
      buffAddedList.push(action.payload);
      return [...buffAddedList];
    case UPDATE_ITEM_IN_JOBS:
      buffUpdatedList = state.map(each => each.id === action.payload.id ? action.payload : each);
      return [...buffUpdatedList];
    case REMOVE_ITEM_IN_JOBS:
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
