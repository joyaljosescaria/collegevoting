import axios from 'axios';

import {
    STUDENT_NOMINATION_ADDING,
    STUDENT_NOMINATION_ADDED,
    STUDENT_NOMINATION_ADD_ERROR,
    STUDENT_COURSE_SELECTING,
    STUDENT_COURSE_SELECTED,
    STUDENT_COURSE_SELECT_ERROR,
    STUDENT_ELECTION_SELECTING,
    STUDENT_ELECTION_SELECTED,
    STUDENT_ELECTION_SELECT_ERROR,
    STUDENT_POSITION_SELECTING,
    STUDENT_POSITION_SELECTED,
    STUDENT_POSITION_SELECT_ERROR,
    STUDENT_CANDIDATE_LOADING,
    STUDENT_CANDIDATE_LOADED,
    STUDENT_CANDIDATE_LOAD_ERROR,
   
} from './types';

import { tokenConfig } from './studentAuth'

// get course

export const getCourse = () => (dispatch , getState) => {

    dispatch({ type: STUDENT_COURSE_SELECTING });

    // Request Body
    // const body = JSON.stringify({ email, unique_id });

    axios
        .post('/student/course', tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({
                type: STUDENT_COURSE_SELECTED,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_COURSE_SELECT_ERROR,
                payload: err.response.data,
            });
        });
};

// Get election 
export const getElection = () => (dispatch , getState) => {

    dispatch({ type: STUDENT_ELECTION_SELECTING });

    // Request Body
    // const body = JSON.stringify({ email, unique_id });

    axios
        .get('/student/election', tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({
                type: STUDENT_ELECTION_SELECTED,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_ELECTION_SELECT_ERROR,
                payload: err.response.data,
            });
        });
};

// Get Position 
export const getPositions = () => (dispatch , getState) => {

    dispatch({ type: STUDENT_POSITION_SELECTING });

    // Request Body
    // const body = JSON.stringify({ email, unique_id });

    axios
        .post('/student/position', tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({
                type: STUDENT_POSITION_SELECTED,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_POSITION_SELECT_ERROR,
                payload: err.response.data,
            });
        });
};

// Send Nomination 
export const sendNomination = (position , election ) => (dispatch , getState) => {

    dispatch({ type: STUDENT_NOMINATION_ADDING });

    // Request Body
    const body = JSON.stringify({ position , election });

    axios
        .post('/student/position', body , tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({
                type: STUDENT_NOMINATION_ADDED,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_NOMINATION_ADD_ERROR,
                payload: err.response.data,
            });
        });
};

//  student canidate
export const loadCanidate = () => (dispatch , getState) => {

    dispatch({ type: STUDENT_CANDIDATE_LOADING });

    // Request Body
    const body = JSON.stringify({});

    axios
        .put('/student/cast', body , tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({
                type: STUDENT_CANDIDATE_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_CANDIDATE_LOAD_ERROR,
                payload: err.response.data,
            });
        });
};

