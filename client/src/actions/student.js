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
    STUDENT_VOTE_ADDING,
    STUDENT_VOTE_ADDED,
    STUDENT_VOTE_ADD_ERROR,
    STUDENT_QUOTES_LOADING,
    STUDENT_QUOTES_LOADED,
    STUDENT_QUOTES_LOAD_ERROR,

} from './types';

import { tokenConfig } from './studentAuth'

// get course

export const getCourse = (ctype) => (dispatch, getState) => {

    dispatch({ type: STUDENT_COURSE_SELECTING });

    // Request Body
    // const body = JSON.stringify({ email, unique_id });

    axios
        .get(`/student/course`, tokenConfig(getState))
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
export const getElection = () => (dispatch, getState) => {

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
export const getPositions = () => (dispatch, getState) => {

    dispatch({ type: STUDENT_POSITION_SELECTING });

    // Request Body
    // const body = JSON.stringify({ email, unique_id });

    axios
        .get('/student/position', tokenConfig(getState))
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
export const sendNomination = (position, election) => (dispatch, getState) => {

    dispatch({ type: STUDENT_NOMINATION_ADDING });

    // Request Body
    const body = JSON.stringify({ position, election });

    axios
        .post('/student/nomination', body, tokenConfig(getState))
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
export const loadCanidate = () => (dispatch, getState) => {

    dispatch({ type: STUDENT_CANDIDATE_LOADING });

    // Request Body

    axios
        .get('/student/cast', tokenConfig(getState))
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

// Add Vote 

export const addVote = (student, position) => (dispatch, getState) => {

    dispatch({ type: STUDENT_VOTE_ADDING });

    // Request Body
    const body = JSON.stringify({});

    axios
        .put(`/student/addvotes/${student}/${position}`, body, tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({
                type: STUDENT_VOTE_ADDED,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_VOTE_ADD_ERROR,
                payload: err.response.data,
            });
        });
};

const getRandom = () => {
    return (Math.floor(Math.random() * (1643 - 0)) + 0);
}

// Load Quotes

export const loadQuotes = () => (dispatch, getState) => {

    dispatch({ type: STUDENT_QUOTES_LOADING });

    // Request Body

    axios
        .get('https://type.fit/api/quotes', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: STUDENT_QUOTES_LOADED,
                payload: res.data[getRandom()],
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: STUDENT_QUOTES_LOAD_ERROR,
                payload: err.message
            });
        });
};