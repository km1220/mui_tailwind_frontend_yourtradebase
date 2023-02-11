import {
  SET_NEW_MATERIAL_LIST, ADD_ITEM_IN_NEW_MATERIAL_LIST, UPDATE_ITEM_IN_NEW_MATERIAL_LIST, REMOVE_ITEM_IN_NEW_MATERIAL_LIST,
  SET_NEW_LABOUR_LIST, ADD_ITEM_IN_NEW_LABOUR_LIST, UPDATE_ITEM_IN_NEW_LABOUR_LIST, REMOVE_ITEM_IN_NEW_LABOUR_LIST
} from '../actions/ActionTypes';

// const initialState = {
//   material_list: [
//     {
//       id: 1,
//       product_code: 324,
//       title: 'first',
//       price: '100',
//       foreach: 'bag',
//       markup: '0.5',
//       brand: 'X',
//       category_id: 1
//     },
//     {
//       id: 2,
//       product_code: 199,
//       title: 'second',
//       price: '200',
//       foreach: 'kg',
//       markup: '0.5',
//       brand: 'Z',
//       category_id: 1
//     },
//     {
//       id: 3,
//       product_code: 1234156,
//       title: 'third',
//       price: '50',
//       foreach: 'bag',
//       markup: '0',
//       brand: 'XXX',
//       category_id: 2
//     },
//     {
//       id: 4,
//       product_code: '',
//       title: '',
//       price: '',
//       foreach: '',
//       markup: '',
//       brand: '',
//       category_id: ''
//     },
//   ],
//   labour_list: [
//     {
//       id: 1,
//       title: 'first',
//       price: '100',
//       per: 'hour',
//       markup: '0.5'
//     },
//     {
//       id: 2,
//       title: 'second',
//       price: '200',
//       per: 'hour',
//       markup: '0.8'
//     },
//     {
//       id: 3,
//       title: 'third',
//       price: '500',
//       per: 'daily',
//       markup: '0.3'
//     },
//     {
//       id: 4,
//       title: '',
//       price: '',
//       per: '',
//       markup: ''
//     },
//   ]
// };
const initialState = {
  material_list: [],
  labour_list: []
};

let buffAddedList;
let buffUpdatedList;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_MATERIAL_LIST:
      return { ...state, material_list: action.payload };
    case ADD_ITEM_IN_NEW_MATERIAL_LIST:
      buffAddedList = state.material_list;
      buffAddedList.push(action.payload)
      return { ...state, material_list: buffAddedList };
    case UPDATE_ITEM_IN_NEW_MATERIAL_LIST:
      buffUpdatedList = state.material_list.map(each => each.id === action.payload.id ? action.payload : each);
      return { ...state, material_list: buffUpdatedList };
    case REMOVE_ITEM_IN_NEW_MATERIAL_LIST:
      buffUpdatedList = state.material_list;
      for (let i = 0; i < buffUpdatedList.length; i++) {
        if (buffUpdatedList[i].id === action.payload) {
          buffUpdatedList.splice(i, 1);
          break;
        }
      }
      return { ...state, material_list: buffUpdatedList };
    // =======================================================================================================

    case SET_NEW_LABOUR_LIST:
      return { ...state, labour_list: action.payload };
    case ADD_ITEM_IN_NEW_LABOUR_LIST:
      buffAddedList = state.labour_list;
      buffAddedList.push(action.payload)
      return { ...state, labour_list: buffAddedList };
    case UPDATE_ITEM_IN_NEW_LABOUR_LIST:
      buffUpdatedList = state.labour_list.map(each => each.id === action.payload.id ? action.payload : each);
      return { ...state, labour_list: buffUpdatedList };
    case REMOVE_ITEM_IN_NEW_LABOUR_LIST:
      buffUpdatedList = state.labour_list;
      for (let i = 0; i < buffUpdatedList.length; i++) {
        if (buffUpdatedList[i].id === action.payload) {
          buffUpdatedList.splice(i, 1);
          break;
        }
      }
      return { ...state, labour_list: buffUpdatedList };


    default:
      return state;
  }
}
