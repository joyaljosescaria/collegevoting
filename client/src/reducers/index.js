import { combineReducers } from 'redux';
import adminAuth from "./adminAuth"
import studentAuth from "./studentAuth"
import admin from "./admin"
import students from "./students"

export default combineReducers({
    adminAuth,
    admin,
    studentAuth,
    students
});