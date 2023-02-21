import { combineReducers } from 'redux';
import loading from './loading';
import alert from './alert';

import user_info from './user_info';
import reminders from './reminders';

import materialLabourList from './pricelist/material_labour_list';
import priceLists from './pricelist/price_lists';
import materials from './pricelist/materials';
import labours from './pricelist/labours';

import customers from './customer/customers';
import extra_infos from './customer/extra_infos';

import quotes from './quotes';
import tasks from './tasks';
import teammates from './teammates';

import email_templates from './template/email.js';

const rootReducer = combineReducers({
    loading_status: loading,
    alert: alert,
    
    user: user_info,
    reminders,

    material_labour_list: materialLabourList,
    price_lists: priceLists,
    materials,
    labours,
    
    customers,
    customer_extra_infos: extra_infos,

    quotes,
    tasks,
    teammates,

    email_templates,
});

export default rootReducer;
