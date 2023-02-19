import { combineReducers } from 'redux';
import user_info from './user_info';
import loading from './loading';

import materialLabourList from './pricelist/material_labour_list';
import priceLists from './pricelist/price_lists';
import materials from './pricelist/materials';
import labours from './pricelist/labours';
import customers from './customers';
import quotes from './quotes';
import tasks from './tasks';
import teammates from './teammates';

const rootReducer = combineReducers({
    user: user_info,
    loading_status: loading,

    material_labour_list: materialLabourList,
    price_lists: priceLists,
    materials,
    labours,
    customers,
    quotes,
    tasks,
    teammates,
});

export default rootReducer;
