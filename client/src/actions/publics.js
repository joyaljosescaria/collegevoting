import axios from 'axios';

import {
    PUBLIC_LELECTION_LOADING,
    PUBLIC_LELECTION_LOADED,
    PUBLIC_LELECTION_LOAD_ERROR,
    PUBLIC_OLDELECTION_LOADING,
    PUBLIC_OLDELECTION_LOADED,
    PUBLIC_OLD_ELECTION_LOAD_ERROR,

} from './types';


// get course

export const getLive = () => (dispatch) => {

    dispatch({ type: PUBLIC_LELECTION_LOADING });

    // Request Body
    // const body = JSON.stringify({ email, unique_id });

    axios
        .get('/publics/live')
        .then((res) => {
            console.log(res);
            dispatch({
                type: PUBLIC_LELECTION_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: PUBLIC_LELECTION_LOAD_ERROR,
                payload: err.response.data,
            });
        });
};

export const getOld = () => (dispatch) => {

    dispatch({ type: PUBLIC_OLDELECTION_LOADING });

    // Request Body
    // const body = JSON.stringify({ email, unique_id });

    axios
        .get('/publics/old')
        .then((res) => {
            console.log(res);
            dispatch({
                type: PUBLIC_OLDELECTION_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            //   dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: PUBLIC_OLD_ELECTION_LOAD_ERROR,
                payload: err.response.data,
            });
        });
};

