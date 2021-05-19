import {
    PUBLIC_LELECTION_LOADING,
    PUBLIC_LELECTION_LOADED,
    PUBLIC_LELECTION_LOAD_ERROR,
    PUBLIC_OLDELECTION_LOADING,
    PUBLIC_OLDELECTION_LOADED,
    PUBLIC_OLD_ELECTION_LOAD_ERROR,

} from '../actions/types';

const initialState = {

    isLiveResultLoading : false,
    isLiveResultLoaded : false,
    isOldResultLoading : false,
    isOldResultLoaded : false,

};


export default function (state = initialState, action) {
    switch (action.type) {
        case PUBLIC_LELECTION_LOADING:
            return {
                ...state,
                isLiveResultLoading: true,
                isLiveResultLoaded: false,
                ...action.payload
            };
        case PUBLIC_LELECTION_LOADED:
            return {
                ...state,
                isLiveResultLoading: false,
                isLiveResultLoaded: true,
                error: '',
                ...action.payload
            };
        case PUBLIC_LELECTION_LOAD_ERROR:
        case PUBLIC_OLD_ELECTION_LOAD_ERROR:
            return {
                ...state,
                ...action.payload
            };
        case PUBLIC_OLDELECTION_LOADING:
            return {
                ...state,
                isOldResultLoading: true,
                isOldResultLoaded: false,
                ...action.payload
            };
        case PUBLIC_OLDELECTION_LOADED:
            return {
                ...state,
                isOldResultLoading: true,
                isOldResultLoaded: false,
                ...action.payload
            };

        default:
            return state;
    }
}