import * as types from './ActionTypes';

// export function SET_ALL_USER_INFO() {
//   console.log('12345678909-', arguments)
//   if (arguments.length === 0) return;
//   return { type: types.SET_ALL_USER_INFO, payload: arguments[0] };
// }


// export function SET_ALALYZED_DATA() {
//   console.log('12345678909-', arguments)
//   if (arguments.length === 0) return;
//   return {
//     type: types.SET_ALALYZED_DATA,
//     payload: { results: arguments[0].results, stats: arguments[0].stats }
//   };
// }


export const SET_ALL_USER_INFO = (data) => {
  return { type: types.SET_ALL_USER_INFO, payload: data };
}
export const RESET_USER_INFO = () => {
  return { type: types.RESET_USER_INFO };
}





// ---------------------------------------------------------
export function SET_ALALYZED_DATA(results, stats) {
  return {
    type: types.SET_ALALYZED_DATA,
    payload: { results: results, stats: stats }
  };
}
export function SET_RESULT_TABLE_TITLES(title_list) {
  return {
    type: types.SET_RESULT_TABLE_TITLES,
    payload: title_list
  }
}