import * as types from './ActionTypes';




export const SET_ALL_USER_INFO = (data) => {
  return { type: types.SET_ALL_USER_INFO, payload: data };
}
export const RESET_USER_INFO = () => {
  return { type: types.RESET_USER_INFO };
}
// =======================================================================================================
// =======================================================================================================
export const SET_PRICE_LISTS = (all_list) => ({ type: types.SET_PRICE_LISTS, payload: all_list });
export const ADD_ITEM_IN_PRICE_LISTS = (item) => ({ type: types.ADD_ITEM_IN_PRICE_LISTS, payload: item });
export const UPDATE_ITEM_IN_PRICE_LISTS = (item) => ({ type: types.UPDATE_ITEM_IN_PRICE_LISTS, payload: item });
export const REMOVE_ITEM_IN_PRICE_LISTS = (id) => ({ type: types.REMOVE_ITEM_IN_PRICE_LISTS, payload: id });
// =======================================================================================================
// =======================================================================================================
export const SET_NEW_MATERIAL_LIST = (all_list) => {
  return { type: types.SET_NEW_MATERIAL_LIST, payload: all_list }
}
export const ADD_ITEM_IN_NEW_MATERIAL_LIST = (item) => {
  return { type: types.ADD_ITEM_IN_NEW_MATERIAL_LIST, payload: item }
}
export const REMOVE_ITEM_IN_NEW_MATERIAL_LIST = (item) => {
  return { type: types.REMOVE_ITEM_IN_NEW_MATERIAL_LIST, payload: item }
}
export const UPDATE_ITEM_IN_NEW_MATERIAL_LIST = (id) => {
  return { type: types.UPDATE_ITEM_IN_NEW_MATERIAL_LIST, payload: id }
}
// ------------------------------------------------------------------------------------------------------------
export const SET_NEW_LABOUR_LIST = (all_list) => {
  return { type: types.SET_NEW_LABOUR_LIST, payload: all_list }
}
export const ADD_ITEM_IN_NEW_LABOUR_LIST = (item) => {
  return { type: types.ADD_ITEM_IN_NEW_LABOUR_LIST, payload: item }
}
export const REMOVE_ITEM_IN_NEW_LABOUR_LIST = (item) => {
  return { type: types.REMOVE_ITEM_IN_NEW_LABOUR_LIST, payload: item }
}
export const UPDATE_ITEM_IN_NEW_LABOUR_LIST = (id) => {
  return { type: types.UPDATE_ITEM_IN_NEW_LABOUR_LIST, payload: id }
}
// =======================================================================================================
// =======================================================================================================
export const SET_MATERIALS = (all_list) => ({ type: types.SET_MATERIALS, payload: all_list });
export const ADD_ITEM_IN_MATERIALS = (item) => ({ type: types.ADD_ITEM_IN_MATERIALS, payload: item });
export const UPDATE_ITEM_IN_MATERIALS = (item) => ({ type: types.UPDATE_ITEM_IN_MATERIALS, payload: item });
export const REMOVE_ITEM_IN_MATERIALS = (id) => ({ type: types.REMOVE_ITEM_IN_MATERIALS, payload: id });
// =======================================================================================================
// =======================================================================================================
export const SET_LABOURS = (all_list) => ({ type: types.SET_LABOURS, payload: all_list });
export const ADD_ITEM_IN_LABOURS = (item) => ({ type: types.ADD_ITEM_IN_LABOURS, payload: item });
export const UPDATE_ITEM_IN_LABOURS = (item) => ({ type: types.UPDATE_ITEM_IN_LABOURS, payload: item });
export const REMOVE_ITEM_IN_LABOURS = (id) => ({ type: types.REMOVE_ITEM_IN_LABOURS, payload: id });
// =======================================================================================================
// =======================================================================================================
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