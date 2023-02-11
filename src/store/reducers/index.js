import { combineReducers } from 'redux';
import user_info from './user_info';

import materialLabourList from './material_labour_list';
import priceLists from './price_lists';


const rootReducer = combineReducers({
    user: user_info,
    price_lists: priceLists,
    material_labour_list: materialLabourList,
});

export default rootReducer;
