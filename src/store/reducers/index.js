import { combineReducers } from 'redux';
import user_info from './user_info';

import materialLabourList from './pricelist/material_labour_list';
import priceLists from './pricelist/price_lists';
import materials from './pricelist/materials';
import labours from './pricelist/labours';
import quotes from './quotes';
import tasks from './tasks';

const rootReducer = combineReducers({
    user: user_info,
    material_labour_list: materialLabourList,
    price_lists: priceLists,
    materials,
    labours,
    quotes,
    tasks,
});

export default rootReducer;
