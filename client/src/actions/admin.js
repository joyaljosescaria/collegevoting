import axios from 'axios';

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

} from './types';

import { tokenConfig } from './adminAuth'

// All Students Loading
export const loadAdminStudents = () => (dispatch, getState) => {
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


// Load Unverified Students
export const loadAdminUnverifiedStudents = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ADMIN_UNSTUDENTS_LOADING });

  axios
    .get('/admin/unverified', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_UNSTUDENTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_UNSTUDENTS_LOAD_ERROR,
      });
    });
};

// Load a single Student
export const loadAdminStudent = (studentId) => (dispatch, getState) => {
  dispatch({ type: ADMIN_STUDENT_LOADING });

  axios
    .get(`/admin/student/${studentId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_STUDENT_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_STUDENT_LOAD_ERROR,
      });
    });
}

// verify student
export const verifyStudent = (studentId) => (dispatch, getState) => {
  dispatch({ type: ADMIN_STUDENT_VERIFYING });

  const body = JSON.stringify({})

  axios
    .put(`/admin/verifystudent/${studentId}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_STUDENT_VERIFIED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_STUDENT_VERIFY_ERROR,
      });
    });
}


// unverify student
export const unverifyStudent = (studentId) => (dispatch, getState) => {
  dispatch({ type: ADMIN_STUDENT_UNVERIFYING });

  const body = JSON.stringify({})

  axios
    .put(`/admin/unverifystudent/${studentId}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_STUDENT_UNVERIFIED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_STUDENT_UNVERIFY_ERROR,
      });
    });
}


// Get all course
export const getAllCourse = () => (dispatch, getState) => {
  dispatch({ type: ADMIN_COURSES_LOADING });

  axios
    .get(`/admin/courses`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_COURSES_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_COURSES_LOAD_ERROR,
      });
    });
}

// Delete a course
export const deleteACourse = (id) => (dispatch, getState) => {
  dispatch({ type: ADMIN_COURSE_DELETEING });

  axios
    .delete(`/admin/courses/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_COURSE_DELETED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_COURSE_DELETE_ERROR,
      });
    });
}

// Edit a course
export const editACourse = (id, course) => (dispatch, getState) => {
  dispatch({ type: ADMIN_COURSE_EDITING });

  const body = JSON.stringify({ course })

  axios
    .put(`/admin/courses/${id}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_COURSE_EDITED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_COURSE_EDIT_ERROR,
      });
    });
}


// Add a course
export const addACourse = (course) => (dispatch, getState) => {
  dispatch({ type: ADMIN_COURSE_ADDING });

  const body = JSON.stringify({ course })

  axios
    .post(`/admin/courses`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_COURSE_ADDED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_COURSE_ADD_ERROR,
      });
    });
}