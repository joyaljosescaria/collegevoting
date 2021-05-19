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

} from '../actions/types';

const initialState = {

    isNominationAdding: false,
    isNominationAdded: false,
    isCourseSelected: false,
    isCourseSelecting: false,
    isElectionSelected: false,
    isElectionSelecting: false,
    isStudentPositionSelected: false,
    isStudentPositionSelecting: false,
    isStudentCanidateLoaded: false,
    isStudentCanidateLoading: false,
    isStudentVoteAdded: false,
    isStudentVoteAdding: false,
    isQuotesLoaded: false,
    isQuotesLoading: false,

};


export default function (state = initialState, action) {
    switch (action.type) {
        case STUDENT_NOMINATION_ADDING:
            return {
                ...state,
                isNominationAdding: true,
                isNominationAdded: false,
                ...action.payload
            };
        case STUDENT_NOMINATION_ADDED:
            return {
                ...state,
                isNominationAdding: false,
                isNominationAdded: true,
                error: '',
                ...action.payload
            };
        case STUDENT_NOMINATION_ADD_ERROR:
        case STUDENT_COURSE_SELECT_ERROR:
        case STUDENT_ELECTION_SELECT_ERROR:
        case STUDENT_POSITION_SELECT_ERROR:
        case STUDENT_CANDIDATE_LOAD_ERROR:
        case STUDENT_VOTE_ADD_ERROR:
        case STUDENT_QUOTES_LOAD_ERROR:
            return {
                ...state,
                ...action.payload
            };
        case STUDENT_COURSE_SELECTING:
            return {
                ...state,
                isCourseSelecting: true,
                isCourseSelected: false,
                ...action.payload
            };
        case STUDENT_COURSE_SELECTED:
            return {
                ...state,
                isCourseSelecting: true,
                isCourseSelected: false,
                ...action.payload
            };
        case STUDENT_ELECTION_SELECTING:
            return {
                ...state,
                isElectionSelecting: true,
                isElectionSelected: false,
                ...action.payload
            };
        case STUDENT_ELECTION_SELECTED:
            return {
                ...state,
                isElectionSelecting: true,
                isElectionSelected: false,
                ...action.payload
            }
        case STUDENT_POSITION_SELECTING:
            return {
                ...state,
                isStudentPositionSelecting: true,
                isStudentPositionSelected: false,
                ...action.payload
            };
        case STUDENT_POSITION_SELECTED:
            return {
                ...state,
                isStudentPositionSelecti: true,
                isStudentPositionSelected: false,
                ...action.payload
            };
        case STUDENT_CANDIDATE_LOADING:
            return {
                ...state,
                isStudentCanidateLoading: true,
                isStudentCanidateLoaded: false,
                ...action.payload
            };
        case STUDENT_CANDIDATE_LOADED:
            return {
                ...state,
                isStudentCanidateLoading: true,
                isStudentCanidateLoaded: false,
                ...action.payload
            }
        case STUDENT_VOTE_ADDING:
            return {
                ...state,
                isStudentVoteAdding: true,
                isStudentVoteAdded: false,
                ...action.payload
            }
        case STUDENT_VOTE_ADDED:
            return {
                ...state,
                isStudentVoteAdding: false,
                isStudentVoteAdded: true,
                ...action.payload
            }
        case STUDENT_QUOTES_LOADING:
            return {
                ...state,
                isQuotesLoaded: false,
                isQuotesLoading:true,
                ...action.payload
            }
        case STUDENT_QUOTES_LOADED:
            return {
                ...state,
                isQuotesLoaded: true,
                isQuotesLoading:false,
                ...action.payload
            }

        default:
            return state;
    }
}