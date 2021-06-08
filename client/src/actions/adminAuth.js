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
  ADMIN_PASS_EMAIL_VALIDATING,
  ADMIN_PASS_EMAIL_VALIDATED,
  ADMIN_PASS_EMAIL_VALIDATE_ERROR,
  ADMIN_PASS_CHANGING,
  ADMIN_PASS_CHANGED,
  ADMIN_PASS_CHANGE_ERROR,

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

 //PASS EMAIL VALIDATION

export const passEmailValidation = (email) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ADMIN_PASS_EMAIL_VALIDATING });

  const body = JSON.stringify({email})

  axios
    .put('/admin/auth/forgotpassword',body , tokenConfig(getState))
    .then((res) => {
      console.log(res)
      dispatch({
        type: ADMIN_PASS_EMAIL_VALIDATED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_PASS_EMAIL_VALIDATE_ERROR,
      });
    });
};

//PASS CHANGE PASSWORD

export const changePassword = (otp, firstpass, secondpass) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ADMIN_PASS_CHANGING });

  const body = JSON.stringify({otp, firstpass, secondpass})

  axios
    .put('/admin/auth/forgotfpassword',body , tokenConfig(getState))
    .then((res) => {
      console.log(res)
      dispatch({
        type: ADMIN_PASS_CHANGED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_PASS_CHANGE_ERROR,
      });
    });
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




