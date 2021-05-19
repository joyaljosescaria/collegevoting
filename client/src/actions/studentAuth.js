import axios from 'axios';

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


} from './types';


export const studentId = (email, unique_id) => (dispatch) => {

    dispatch({ type: STUDENT_UNIQUEID_VERIFYING });

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ email, unique_id });
    axios
        .post('/student/loginpre', body, config)
        .then((res) => {
            console.log(res);
            dispatch({
                type: STUDENT_UNIQUEID_VERIFIED,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_UNIQUEID_VERIFY_ERROR,
                payload: err.response.data,
            });
        });
};

// Login 

export const studentLogin = (email, unique_id, password) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ email, unique_id, password });
    axios
        .post('/student/login', body, config)
        .then((res) => {
            console.log(res);
            dispatch({
                type: STUDENT_LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_LOGIN_FAIL,
                payload: err.response.data,
            });
        });
};

export const loadStudent = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: STUDENT_LOADED });

    axios
        .get('/student/profile', tokenConfig(getState))
        .then((res) => {
            console.log(res)
            dispatch({
                type: STUDENT_LOADING,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_AUTH_ERROR,
            });
        });
};

// Student USER
export const studentLogout = () => (dispatch) => {
    console.log("logout")
    dispatch({
        type: STUDENT_LOGOUT_SUCCESS
    })
};



// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().studentAuth.token;
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

 //Register

 export const studentRegister = (name, email, course_id, batch_year_count, formData) => (dispatch) => {
    dispatch({ type: STUDENT_REGISTERING });
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ name, email, course_id, batch_year_count});
    axios
        .post('/student/register', formData , config) 
        .then((res) => {
            console.log(res);
            dispatch({
                type: STUDENT_REGISTERD,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_REGISTER_ERROR,
                payload: err.response.data,
            });
        });
};
