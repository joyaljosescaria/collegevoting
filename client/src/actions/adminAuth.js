import axios from 'axios';

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

} from './types';


// LOGIN USER
export const adminLogin = (email, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ email, password });
  axios
    .post('/admin/auth/login/', body, config)
    .then((res) => {
      console.log(res);
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      //   dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_LOGIN_FAIL,
        payload: err.response.data,
      });
    });
};

export const loadAdmin = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ADMIN_LOADING });

  axios
    .get('/admin/auth/profile', tokenConfig(getState))
    .then((res) => {
      console.log(res)
      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_AUTH_ERROR,
      });
    });
};

export const loadAdminStudents = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ADMIN_STUDENTS_LOADING });

  axios
    .get('/admin/students', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_STUDENTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_STUDENTS_LOAD_ERROR,
      });
    });
};

// LOGOUT USER
export const adminLogout = () => (dispatch) => {
  console.log("logout")
  dispatch({ 
    type: ADMIN_LOGOUT_SUCCESS 
  })
};



// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().adminAuth.token;
  console.log(token)

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`;
  }
  return config;
};
