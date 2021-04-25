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
  ADMIN_ELECTION_ADDING,
  ADMIN_ELECTION_ADDED,
  ADMIN_ELECTION_ADD_ERROR,
  ADMIN_ELECTION_EDITING,
  ADMIN_ELECTION_EDITED,
  ADMIN_ELECTION_EDIT_ERROR,
  ADMIN_ELECTION_LOADING,
  ADMIN_ELECTION_LOADED,
  ADMIN_ELECTION_LOAD_ERROR,
  ADMIN_ELECTION_DELETING,
  ADMIN_ELECTION_DELETED,
  ADMIN_ELECTION_DELETE_ERROR,
  ADMIN_POSITION_ADDING,
  ADMIN_POSITION_ADDED,
  ADMIN_POSITION_ADD_ERROR,
  ADMIN_POSITION_EDITING,
  ADMIN_POSITION_EDITED,
  ADMIN_POSITION_EDIT_ERROR,
  ADMIN_POSITION_DELETING,
  ADMIN_POSITION_DELETED,
  ADMIN_POSITION_DELETE_ERROR,
  ADMIN_POSITION_LOADING,
  ADMIN_POSITION_LOADED,
  ADMIN_POSITION_LOAD_ERROR,

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

// Add Election

export const addElection = (election, date) => (dispatch, getState) => {
  dispatch({ type: ADMIN_ELECTION_ADDING });

  const body = JSON.stringify({ election, date })

  axios
    .post(`/admin/elections`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_ELECTION_ADDED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_ELECTION_ADD_ERROR,
      });
    });
}

// Edit Election

export const editElection = (election, date, id) => (dispatch, getState) => {
  dispatch({ type: ADMIN_ELECTION_EDITING });

  const body = JSON.stringify({ election, date })

  axios
    .put(`/admin/elections/${id}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_ELECTION_EDITED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_ELECTION_EDIT_ERROR,
      });
    });
}

// Load Elections

export const loadElections = () => (dispatch, getState) => {
  dispatch({ type: ADMIN_ELECTION_LOADING });

  axios
    .get(`/admin/elections`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_ELECTION_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_ELECTION_LOAD_ERROR,
      });
    });
}

// Delete Election

export const deleteElection = (id) => (dispatch, getState) => {
  dispatch({ type: ADMIN_ELECTION_DELETING });

  axios
    .delete(`/admin/elections/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_ELECTION_DELETED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_ELECTION_DELETE_ERROR,
      });
    });
}

// Load Positions

export const loadPositions = (id) => (dispatch, getState) => {
  dispatch({ type: ADMIN_POSITION_LOADING });

  axios
    .get(`/admin/election/position/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_POSITION_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_POSITION_LOAD_ERROR,
      });
    });
}

// Edit Positions

export const editPosition = (position, batch_year_count, course_id, election_id, id) => (dispatch, getState) => {
  dispatch({ type: ADMIN_POSITION_EDITING });

  const body = JSON.stringify({ position, batch_year_count, course_id, election_id })

  axios
    .put(`/admin/election/position/${id}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_POSITION_EDITED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_POSITION_EDIT_ERROR,
      });
    });
}

// Add Positions

export const addPosition = (position, batch_year_count, course_id, election_id) => (dispatch, getState) => {
  dispatch({ type: ADMIN_POSITION_ADDING });

  const body = JSON.stringify({ position, batch_year_count, course_id, election_id })

  axios
    .post(`/admin/election/position`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_POSITION_ADDED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_POSITION_ADD_ERROR,
      });
    });
}

// Delete Positions

export const deletePosition = (positionId , electionId) => (dispatch, getState) => {
  dispatch({ type: ADMIN_POSITION_DELETING });

  axios
    .delete(`/admin/election/position/${positionId}/${electionId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMIN_POSITION_DELETED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADMIN_POSITION_DELETE_ERROR,
      });
    });
}