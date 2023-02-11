import { combineReducers } from 'redux';
import user_info from './user_info';

import materialLabourList from './material_labour_list';
import priceLists from './price_lists';
import materials from './materials';
import labours from './labours';

const rootReducer = combineReducers({
    user: user_info,
    material_labour_list: materialLabourList,
    price_lists: priceLists,
    materials,
    labours,
});

export default rootReducer;
