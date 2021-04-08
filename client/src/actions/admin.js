import axios from 'axios';

import {
  ADMIN_STUDENTS_LOADING,
  ADMIN_STUDENTS_LOADED,
  ADMIN_STUDENTS_LOAD_ERROR,
  ADMIN_STUDENT_LOADING,
  ADMIN_STUDENT_LOADED,
  ADMIN_STUDENT_LOAD_ERROR,


} from './types';

import { tokenConfig } from './adminAuth'

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