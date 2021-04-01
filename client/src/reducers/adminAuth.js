
import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOADED,
  ADMIN_LOADING,
  ADMIN_AUTH_ERROR

} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  name: localStorage.getItem('username'),
  id: localStorage.getItem('id'),
  err: null,
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

    default:
      return state;
  }
}