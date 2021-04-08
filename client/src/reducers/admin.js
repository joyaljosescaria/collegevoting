import {
    ADMIN_STUDENTS_LOADING,
    ADMIN_STUDENTS_LOADED,
    ADMIN_STUDENTS_LOAD_ERROR,
    ADMIN_STUDENT_LOADING,
    ADMIN_STUDENT_LOADED,
    ADMIN_STUDENT_LOAD_ERROR,


} from '../actions/types';

const initialState = {
    isAdminStudentsLoading: false,
    isAdminStudentLoading: false,
    isAdminStudentLoaded: false,
    student: {}
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ADMIN_STUDENTS_LOADING:
            return {
                ...state,
                isAdminStudentsLoading: true,
            };
        case ADMIN_STUDENTS_LOADED:
            return {
                ...state,
                isAdminStudentsLoading: false,
                ...action.payload
            }
        case ADMIN_STUDENTS_LOAD_ERROR:
        case ADMIN_STUDENT_LOAD_ERROR:
            return {
                ...state,
                ...action.payload
            }
        case ADMIN_STUDENT_LOADING:
            return {
                ...state,
                isAdminStudentLoading: true,
                isAdminStudentLoaded: false,
                student:{}
            };
        case ADMIN_STUDENT_LOADED:
            return {
                ...state,
                isAdminStudentLoading: false,
                isAdminStudentLoaded: true,
                ...action.payload
            }

        default:
            return state;
    }
}