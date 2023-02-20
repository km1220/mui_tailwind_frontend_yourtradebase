import * as types from './ActionTypes';




export const LOADING = (flag = true) => ({ type: flag ? types.SET_LOADING : types.REMOVE_LOADING });
export const SET_ALERT = (data) => ({ type: types.SET_ALERT, payload: data });
export const RESET_ALERT = () => ({ type: types.RESET_ALERT });
// =======================================================================================================
// =======================================================================================================
export const SET_USER_INFO = (data) => ({ type: types.SET_USER_INFO, payload: data });
export const RESET_USER_INFO = () => ({ type: types.RESET_USER_INFO });
export const SET_USER_REMINDERS = (data) => ({ type: types.SET_USER_REMINDERS, payload: data });
export const RESET_USER_REMINDERS = () => ({ type: types.RESET_USER_REMINDERS });
// =======================================================================================================
// =======================================================================================================
export const SET_PRICE_LISTS = (all_list) => ({ type: types.SET_PRICE_LISTS, payload: all_list });
export const ADD_ITEM_IN_PRICE_LISTS = (item) => ({ type: types.ADD_ITEM_IN_PRICE_LISTS, payload: item });
export const UPDATE_ITEM_IN_PRICE_LISTS = (item) => ({ type: types.UPDATE_ITEM_IN_PRICE_LISTS, payload: item });
export const REMOVE_ITEM_IN_PRICE_LISTS = (id) => ({ type: types.REMOVE_ITEM_IN_PRICE_LISTS, payload: id });
// =======================================================================================================
// =======================================================================================================
export const SET_NEW_MATERIAL_LIST = (all_list) => ({ type: types.SET_NEW_MATERIAL_LIST, payload: all_list });
export const ADD_ITEM_IN_NEW_MATERIAL_LIST = (item) => ({ type: types.ADD_ITEM_IN_NEW_MATERIAL_LIST, payload: item });
export const REMOVE_ITEM_IN_NEW_MATERIAL_LIST = (item) => ({ type: types.REMOVE_ITEM_IN_NEW_MATERIAL_LIST, payload: item });
export const UPDATE_ITEM_IN_NEW_MATERIAL_LIST = (id) => ({ type: types.UPDATE_ITEM_IN_NEW_MATERIAL_LIST, payload: id });
// ------------------------------------------------------------------------------------------------------------
export const SET_NEW_LABOUR_LIST = (all_list) => ({ type: types.SET_NEW_LABOUR_LIST, payload: all_list });
export const ADD_ITEM_IN_NEW_LABOUR_LIST = (item) => ({ type: types.ADD_ITEM_IN_NEW_LABOUR_LIST, payload: item });
export const REMOVE_ITEM_IN_NEW_LABOUR_LIST = (item) => ({ type: types.REMOVE_ITEM_IN_NEW_LABOUR_LIST, payload: item });
export const UPDATE_ITEM_IN_NEW_LABOUR_LIST = (id) => ({ type: types.UPDATE_ITEM_IN_NEW_LABOUR_LIST, payload: id });
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
export const SET_CUSTOMERS = (all_list) => ({ type: types.SET_CUSTOMERS, payload: all_list });
export const ADD_ITEM_IN_CUSTOMERS = (item) => ({ type: types.ADD_ITEM_IN_CUSTOMERS, payload: item });
export const UPDATE_ITEM_IN_CUSTOMERS = (item) => ({ type: types.UPDATE_ITEM_IN_CUSTOMERS, payload: item });
export const REMOVE_ITEM_IN_CUSTOMERS = (id) => ({ type: types.REMOVE_ITEM_IN_CUSTOMERS, payload: id });
// =======================================================================================================
// =======================================================================================================
export const SET_QUOTES = (all_list) => ({ type: types.SET_QUOTES, payload: all_list });
export const ADD_ITEM_IN_QUOTES = (item) => ({ type: types.ADD_ITEM_IN_QUOTES, payload: item });
export const UPDATE_ITEM_IN_QUOTES = (item) => ({ type: types.UPDATE_ITEM_IN_QUOTES, payload: item });
export const REMOVE_ITEM_IN_QUOTES = (id) => ({ type: types.REMOVE_ITEM_IN_QUOTES, payload: id });
// =======================================================================================================
// =======================================================================================================
export const SET_TASKS = (all_list) => ({ type: types.SET_TASKS, payload: all_list });
export const ADD_ITEM_IN_TASKS = (item) => ({ type: types.ADD_ITEM_IN_TASKS, payload: item });
export const UPDATE_ITEM_IN_TASKS = (item) => ({ type: types.UPDATE_ITEM_IN_TASKS, payload: item });
export const REMOVE_ITEM_IN_TASKS = (id) => ({ type: types.REMOVE_ITEM_IN_TASKS, payload: id });
// =======================================================================================================
// =======================================================================================================
export const SET_TEAMMATES = (all_list) => ({ type: types.SET_TEAMMATES, payload: all_list });
export const ADD_ITEM_IN_TEAMMATES = (item) => ({ type: types.ADD_ITEM_IN_TEAMMATES, payload: item });
export const UPDATE_ITEM_IN_TEAMMATES = (item) => ({ type: types.UPDATE_ITEM_IN_TEAMMATES, payload: item });
export const REMOVE_ITEM_IN_TEAMMATES = (id) => ({ type: types.REMOVE_ITEM_IN_TEAMMATES, payload: id });
// =======================================================================================================
// =======================================================================================================








export const SET_ALALYZED_DATA = (results, stats) => ({
  type: types.SET_ALALYZED_DATA,
  payload: { results: results, stats: stats }
});
export const SET_RESULT_TABLE_TITLES = (title_list) => ({
  type: types.SET_RESULT_TABLE_TITLES,
  payload: title_list
});