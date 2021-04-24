import {
    ADMIN_STUDENTS_LOADING,
    ADMIN_STUDENTS_LOADED,
    ADMIN_STUDENTS_LOAD_ERROR,
    ADMIN_STUDENT_LOADING,
    ADMIN_STUDENT_LOADED,
    ADMIN_STUDENT_LOAD_ERROR,
    ADMIN_STUDENT_UNVERIFYING,
    ADMIN_STUDENT_UNVERIFIED,
    ADMIN_STUDENT_UNVERIFY_ERROR,
    ADMIN_STUDENT_VERIFYING,
    ADMIN_STUDENT_VERIFIED,
    ADMIN_STUDENT_VERIFY_ERROR,
    ADMIN_UNSTUDENTS_LOADING,
    ADMIN_UNSTUDENTS_LOADED,
    ADMIN_UNSTUDENTS_LOAD_ERROR,
    ADMIN_COURSES_LOADING,
    ADMIN_COURSES_LOADED,
    ADMIN_COURSES_LOAD_ERROR,
    ADMIN_COURSE_DELETEING,
    ADMIN_COURSE_DELETED,
    ADMIN_COURSE_DELETE_ERROR,
    ADMIN_COURSE_ADDING,
    ADMIN_COURSE_ADDED,
    ADMIN_COURSE_ADD_ERROR,
    ADMIN_COURSE_EDITING,
    ADMIN_COURSE_EDITED,
    ADMIN_COURSE_EDIT_ERROR,

} from '../actions/types';

const initialState = {
    isAdminStudentsLoading: false,
    isAdminStudentLoading: false,
    isAdminStudentLoaded: false,
    student: {},
    isAdminStudentVerifying: false,
    isAdminStudentVerified: false,
    isAdminStudentUnVerifying: false,
    isAdminStudentUnVerified: false,
    isUnverifiedStudentLoading: false,
    isUnverifiedStudentLoaded: false,
    isAdminCoursesLoading: false,
    isAdminCoursesLoaded: false,
    isAdminCourseDeleting: false,
    isAdminCourseDeleted: false,
    isAdminCourseAdding: false,
    isAdminCourseAdded: false,
    isAdminCourseEditing: false,
    isAdminCourseEdited: false,
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
                isAdminStudentUnVerified: false,
                isAdminStudentVerified: false,
                ...action.payload
            }
        case ADMIN_STUDENTS_LOAD_ERROR:
        case ADMIN_STUDENT_LOAD_ERROR:
        case ADMIN_STUDENT_VERIFY_ERROR:
        case ADMIN_STUDENT_UNVERIFY_ERROR:
        case ADMIN_UNSTUDENTS_LOAD_ERROR:
        case ADMIN_COURSES_LOAD_ERROR:
        case ADMIN_COURSE_DELETE_ERROR:
        case ADMIN_COURSE_ADD_ERROR:
        case ADMIN_COURSE_EDIT_ERROR:
            return {
                ...state,
                ...action.payload
            }
        case ADMIN_STUDENT_LOADING:
            return {
                ...state,
                isAdminStudentLoading: true,
                isAdminStudentLoaded: false,
                student: {}
            };
        case ADMIN_STUDENT_LOADED:
            return {
                ...state,
                isAdminStudentLoading: false,
                isAdminStudentLoaded: true,
                ...action.payload
            }
        case ADMIN_STUDENT_VERIFYING:
            return {
                ...state,
                isAdminStudentVerifying: true,
                isAdminStudentVerified: false,
                ...action.payload
            }
        case ADMIN_STUDENT_VERIFIED:
            return {
                ...state,
                isAdminStudentVerifying: false,
                isAdminStudentVerified: true,
                ...action.payload
            }
        case ADMIN_STUDENT_UNVERIFYING:
            return {
                ...state,
                isAdminStudentUnVerifying: true,
                isAdminStudentUnVerified: false,
                ...action.payload
            }
        case ADMIN_STUDENT_UNVERIFIED:
            return {
                ...state,
                isAdminStudentUnVerifying: false,
                isAdminStudentUnVerified: true,
                ...action.payload
            }
        case ADMIN_UNSTUDENTS_LOADING:
            return {
                ...state,
                isUnverifiedStudentLoading: true,
                isUnverifiedStudentLoaded: false,
                ...action.payload
            }
        case ADMIN_UNSTUDENTS_LOADED:
            return {
                ...state,
                isUnverifiedStudentLoaded: true,
                isUnverifiedStudentLoading: false,
                ...action.payload
            }
        case ADMIN_COURSES_LOADING:
            return {
                ...state,
                isAdminCoursesLoading: true,
                isAdminCoursesLoaded: false,
                ...action.payload
            }
        case ADMIN_COURSES_LOADED:
            return {
                ...state,
                isAdminCoursesLoading: false,
                isAdminCoursesLoaded: true,
                ...action.payload
            }
        case ADMIN_COURSE_DELETEING:
            return {
                ...state,
                isAdminCourseDeleting: true,
                isAdminCourseDeleted: false,
                ...action.payload
            }
        case ADMIN_COURSE_DELETED:
            return {
                ...state,
                isAdminCourseDeleting: false,
                isAdminCourseDeleted: true,
                ...action.payload
            }
        case ADMIN_COURSE_ADDING:
            return {
                ...state,
                isAdminCourseAdded: false,
                isAdminCourseAdding: true,
                ...action.payload
            }
        case ADMIN_COURSE_ADDED:
            return {
                ...state,
                isAdminCourseAdded: true,
                isAdminCourseAdding: false,
                ...action.payload
            }
        case ADMIN_COURSE_EDITING:
            return {
                ...state,
                isAdminCourseEdited: false,
                isAdminCourseEditing: true,
                ...action.payload
            }
        case ADMIN_COURSE_EDITED:
            return {
                ...state,
                isAdminCourseEdited: true,
                isAdminCourseEditing: false,
                ...action.payload
            }

        default:
            return state;
    }
}