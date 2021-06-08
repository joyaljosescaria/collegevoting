
import { validateLocaleAndSetLanguage } from 'typescript';
import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOADED,
  ADMIN_LOADING,
  ADMIN_AUTH_ERROR,
  ADMIN_STUDENTS_LOADING,
  ADMIN_STUDENTS_LOADED,
  ADMIN_STUDENTS_LOAD_ERROR,
  ADMIN_PASS_EMAIL_VALIDATING,
  ADMIN_PASS_EMAIL_VALIDATED,
  ADMIN_PASS_EMAIL_VALIDATE_ERROR,
  ADMIN_PASS_CHANGING,
  ADMIN_PASS_CHANGED,
  ADMIN_PASS_CHANGE_ERROR,

} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  name: localStorage.getItem('username'),
  id: localStorage.getItem('id'),
  isAdminStudentsLoaded: false,
  isAdminEmailValidating: false,
  isAdminEmailValidated: false,
  isAdminPasswordChanging:false,
  isAdminPasswordChanged:false,
};


export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.name);
      localStorage.setItem('id', action.payload.id);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case ADMIN_LOGIN_FAIL:
    case ADMIN_AUTH_ERROR:
    case ADMIN_LOGOUT_SUCCESS:
    case ADMIN_PASS_EMAIL_VALIDATE_ERROR:
    case ADMIN_PASS_CHANGE_ERROR:
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
    case ADMIN_PASS_EMAIL_VALIDATED:
      return{
        ...state,
        ...action.payload,
        isAdminEmailValidating:false,
        isAdminEmailValidated:true,
      }
    case ADMIN_PASS_EMAIL_VALIDATING:
      return{
        ...state,
        ...action.payload,
        isAdminEmailValidating:true,
        isAdminEmailValidated:false,
      }

      case ADMIN_PASS_CHANGED:
        return{
          ...state,
          ...action.payload,
          isAdminPassChanging:false,
          isAdminPassChanged:true,
        }
      case ADMIN_PASS_CHANGING:
        return{
          ...state,
          ...action.payload,
          isAdminPassChanging:true,
          isAdminPassChanged:false,
        }
    default:
      return state;
  }
}