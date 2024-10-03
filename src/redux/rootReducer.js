import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import sidebarReducer from './slices/sidebarSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    sidebar: sidebarReducer,
});

export default rootReducer;
