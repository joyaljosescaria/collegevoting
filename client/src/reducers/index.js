import { combineReducers } from 'redux';
import adminAuth from "./adminAuth"
import admin from "./admin"

export default combineReducers({
    adminAuth,
    admin
});