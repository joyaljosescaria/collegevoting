
import {
    STUDENT_UNIQUEID_VERIFYING,
    STUDENT_UNIQUEID_VERIFIED,
    STUDENT_UNIQUEID_VERIFY_ERROR,
    STUDENT_LOGIN_SUCCESS,
    STUDENT_LOGIN_FAIL,
    STUDENT_LOGOUT_SUCCESS,
    STUDENT_LOADED,
    STUDENT_LOADING,
    STUDENT_AUTH_ERROR,
    STUDENT_REGISTERING,
    STUDENT_REGISTERD,
    STUDENT_REGISTER_ERROR,


} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    name: localStorage.getItem('username'),
    id: localStorage.getItem('id'),
    isStudentUniqueidVerifying: false,
    isStudentUniqueidVerified: false,
    isStudentRegistering: false,
    isStudentRegestered: false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case STUDENT_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case STUDENT_LOADED:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case STUDENT_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('username', action.payload.name);
            localStorage.setItem('id', action.payload.id);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };

        case STUDENT_LOGOUT_SUCCESS:
        case STUDENT_UNIQUEID_VERIFY_ERROR:
        case STUDENT_LOGIN_FAIL:
        case STUDENT_AUTH_ERROR:
        case STUDENT_REGISTER_ERROR:
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('id');
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case STUDENT_UNIQUEID_VERIFYING:
            return {
                ...state,
                isStudentUniqueidVerified: false,
                isStudentUniqueidVerifying: true,
                ...action.payload
            }
        case STUDENT_UNIQUEID_VERIFIED:
            return {
                ...state,
                isStudentUniqueidVerified: true,
                isStudentUniqueidVerifying: false,
                ...action.payload
            }

            case STUDENT_REGISTERING:
                return {
                    ...state,
                    isStudentRegestered: false,
                    isStudentRegistering: true,
                    ...action.payload
                }
            case STUDENT_REGISTERD:
                return {
                    ...state,
                    isStudentRegestered: true,
                    isStudentRegistering: false,
                    ...action.payload
                }
    

        default:
            return state;
    }
}