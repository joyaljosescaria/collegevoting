import {
    ADMIN_STUDENTS_LOADING,
    ADMIN_STUDENTS_LOADED,
    ADMIN_STUDENTS_LOAD_ERROR,

} from '../actions/types';

const initialState = {
    isAdminStudentsLoading: false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ADMIN_STUDENTS_LOADING:
            return {
                ...state,
                isAdminStudentsLoading: true,
            };
        case ADMIN_STUDENTS_LOADED:
            return{
                ...state,
                isAdminStudentsLoading:false,
                ...action.payload
            }
        case ADMIN_STUDENTS_LOAD_ERROR:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}