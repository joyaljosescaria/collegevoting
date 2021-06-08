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
    ADMIN_CANDIDATE_LOADING,
    ADMIN_CANDIDATE_LOADED,
    ADMIN_CANDIDATE_LOAD_ERROR,
    ADMIN_CANDIDATES_LOADING,
    ADMIN_CANDIDATES_LOADED,
    ADMIN_CANDIDATES_LOAD_ERROR,
    ADMIN_CANDIDATE_VERIFYING,
    ADMIN_CANDIDATE_VERIFIED,
    ADMIN_CANDIDATE_VERIFY_ERROR,
    ADMIN_CANDIDATE_UNVERIFYING,
    ADMIN_CANDIDATE_UNVERIFIED,
    ADMIN_CANDIDATE_UNVERIFY_ERROR,
    ADMIN_ELECTION_STARTING,
    ADMIN_ELECTION_STATRTED,
    ADMIN_ELECTION_START_ERROR,
    ADMIN_STUDENT_DELETING,
    ADMIN_STUDENT_DELETED,
    ADMIN_STUDENT_DELETE_ERROR,
    ADMIN_BATCH_UPDATING,
    ADMIN_BATCH_UPDATED,
    ADMIN_BATCH_UPDATE_ERROR,
    ADMIN_NOMINATION_TOGGLING,
    ADMIN_NOMINATION_TOGGLED,
    ADMIN_NOMINATION_TOGGLE_ERROR,

} from '../actions/types';

const initialState = {
    isAdminStudentsLoading: false,
    isAdminStudentLoading: false,
    isAdminStudentLoaded: false,
    student: {},
    isAdminStudentVerifying: false,
    isAdminStudentVerified: false,
    isAdminStudentUnVerifying: false,
    isAdminStudentUnVerified: false,
    isUnverifiedStudentLoading: false,
    isUnverifiedStudentLoaded: false,
    isAdminCoursesLoading: false,
    isAdminCoursesLoaded: false,
    isAdminCourseDeleting: false,
    isAdminCourseDeleted: false,
    isAdminCourseAdding: false,
    isAdminCourseAdded: false,
    isAdminCourseEditing: false,
    isAdminCourseEdited: false,
    isAdminElectionAdded: false,
    isAdminElectionAdding: false,
    isAdminElectionEditing: false,
    isAdminElectionEdited: false,
    isAdminElectionLoading: false,
    isAdminElectionLoaded: false,
    isAdminElectionDeleted: false,
    isAdminElectionDeleting: false,
    isAdminPositionsLoading: false,
    isAdminPositionsLoaded: false,
    isAdminPositionDeleting: false,
    isAdminPositionDeleted: false,
    isAdminPositionEditing: false,
    isAdminPositionEdited: false,
    isAdminPositionAdding: false,
    isAdminPositionAdded: false,
    isAdminCandidateLoading: false,
    isAdminCandidateLoaded: false,
    isAdminCandidatesLoading: false,
    isAdminCandidatesLoaded: false,
    isAdminCandidateVerifying: false,
    isAdminCandidateVerified: false,
    isAdminCandidateUnVerifying: false,
    isAdminCandidateUnVerified: false,
    isAdminElectionStarting: false,
    isAdminElectionStarted: false,
    isAdminStudentDeleteing: false,
    isAdminStudentDeleted: false,
    isAdminBatchUpdating: false,
    isAdminBatchUpdated: false,
    isAdminNominationToggling: false,
    isAdminNominationToggled: false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ADMIN_STUDENTS_LOADING:
            return {
                ...state,
                isAdminStudentsLoading: true,
            };
        case ADMIN_STUDENTS_LOADED:
            return {
                ...state,
                isAdminStudentsLoading: false,
                isAdminStudentUnVerified: false,
                isAdminStudentVerified: false,
                ...action.payload
            }
        case ADMIN_STUDENTS_LOAD_ERROR:
        case ADMIN_STUDENT_LOAD_ERROR:
        case ADMIN_STUDENT_VERIFY_ERROR:
        case ADMIN_STUDENT_UNVERIFY_ERROR:
        case ADMIN_UNSTUDENTS_LOAD_ERROR:
        case ADMIN_COURSES_LOAD_ERROR:
        case ADMIN_COURSE_DELETE_ERROR:
        case ADMIN_COURSE_ADD_ERROR:
        case ADMIN_COURSE_EDIT_ERROR:
        case ADMIN_ELECTION_ADD_ERROR:
        case ADMIN_ELECTION_EDIT_ERROR:
        case ADMIN_ELECTION_LOAD_ERROR:
        case ADMIN_ELECTION_DELETE_ERROR:
        case ADMIN_POSITION_ADD_ERROR:
        case ADMIN_POSITION_EDIT_ERROR:
        case ADMIN_POSITION_DELETE_ERROR:
        case ADMIN_POSITION_LOAD_ERROR:
        case ADMIN_CANDIDATE_LOAD_ERROR:
        case ADMIN_CANDIDATES_LOAD_ERROR:
        case ADMIN_CANDIDATE_VERIFY_ERROR:
        case ADMIN_CANDIDATE_UNVERIFY_ERROR:
        case ADMIN_ELECTION_START_ERROR:
        case ADMIN_STUDENT_DELETE_ERROR:
        case ADMIN_BATCH_UPDATE_ERROR:
        case ADMIN_NOMINATION_TOGGLE_ERROR:

            return {
                ...state,
                ...action.payload
            }
        case ADMIN_STUDENT_LOADING:
            return {
                ...state,
                isAdminStudentLoading: true,
                isAdminStudentLoaded: false,
                student: {}
            };
        case ADMIN_STUDENT_LOADED:
            return {
                ...state,
                isAdminStudentLoading: false,
                isAdminStudentLoaded: true,
                ...action.payload
            }
        case ADMIN_STUDENT_VERIFYING:
            return {
                ...state,
                isAdminStudentVerifying: true,
                isAdminStudentVerified: false,
                ...action.payload
            }
        case ADMIN_STUDENT_VERIFIED:
            return {
                ...state,
                isAdminStudentVerifying: false,
                isAdminStudentVerified: true,
                ...action.payload
            }
        case ADMIN_STUDENT_UNVERIFYING:
            return {
                ...state,
                isAdminStudentUnVerifying: true,
                isAdminStudentUnVerified: false,
                ...action.payload
            }
        case ADMIN_STUDENT_UNVERIFIED:
            return {
                ...state,
                isAdminStudentUnVerifying: false,
                isAdminStudentUnVerified: true,
                ...action.payload
            }
        case ADMIN_UNSTUDENTS_LOADING:
            return {
                ...state,
                isUnverifiedStudentLoading: true,
                isUnverifiedStudentLoaded: false,
                ...action.payload
            }
        case ADMIN_UNSTUDENTS_LOADED:
            return {
                ...state,
                isUnverifiedStudentLoaded: true,
                isUnverifiedStudentLoading: false,
                ...action.payload
            }
        case ADMIN_COURSES_LOADING:
            return {
                ...state,
                isAdminCoursesLoading: true,
                isAdminCoursesLoaded: false,
                ...action.payload
            }
        case ADMIN_COURSES_LOADED:
            return {
                ...state,
                isAdminCoursesLoading: false,
                isAdminCoursesLoaded: true,
                ...action.payload
            }
        case ADMIN_COURSE_DELETEING:
            return {
                ...state,
                isAdminCourseDeleting: true,
                isAdminCourseDeleted: false,
                ...action.payload
            }
        case ADMIN_COURSE_DELETED:
            return {
                ...state,
                isAdminCourseDeleting: false,
                isAdminCourseDeleted: true,
                ...action.payload
            }
        case ADMIN_COURSE_ADDING:
            return {
                ...state,
                isAdminCourseAdded: false,
                isAdminCourseAdding: true,
                ...action.payload
            }
        case ADMIN_COURSE_ADDED:
            return {
                ...state,
                isAdminCourseAdded: true,
                isAdminCourseAdding: false,
                ...action.payload
            }
        case ADMIN_COURSE_EDITING:
            return {
                ...state,
                isAdminCourseEdited: false,
                isAdminCourseEditing: true,
                ...action.payload
            }
        case ADMIN_COURSE_EDITED:
            return {
                ...state,
                isAdminCourseEdited: true,
                isAdminCourseEditing: false,
                ...action.payload
            }
        case ADMIN_ELECTION_ADDING:
            return {
                ...state,
                isAdminElectionAdded: false,
                isAdminElectionAdding: true,
                ...action.payload
            }
        case ADMIN_ELECTION_ADDED:
            return {
                ...state,
                isAdminElectionAdded: true,
                isAdminElectionAdding: false,
                ...action.payload
            }
        case ADMIN_ELECTION_EDITING:
            return {
                ...state,
                isAdminElectionEditing: true,
                isAdminElectionEdited: false,
                ...action.payload
            }
        case ADMIN_ELECTION_EDITED:
            return {
                ...state,
                isAdminElectionEditing: false,
                isAdminElectionEdited: true,
                ...action.payload
            }
        case ADMIN_ELECTION_LOADING:
            return {
                ...state,
                isAdminElectionLoading: true,
                isAdminElectionLoaded: false,
                ...action.payload
            }
        case ADMIN_ELECTION_LOADED:
            return {
                ...state,
                isAdminElectionLoading: false,
                isAdminElectionLoaded: true,
                ...action.payload
            }
        case ADMIN_ELECTION_DELETING:
            return {
                ...state,
                isAdminElectionDeleting: true,
                isAdminElectionDeleted: false,
                ...action.payload
            }
        case ADMIN_ELECTION_DELETED:
            return {
                ...state,
                isAdminElectionDeleting: false,
                isAdminElectionDeleted: true,
                ...action.payload
            }
        case ADMIN_POSITION_ADDING:
            return {
                ...state,
                isAdminPositionAdding: true,
                isAdminPositionAdded: false,
                ...action.payload
            }
        case ADMIN_POSITION_ADDED:
            return {
                ...state,
                isAdminPositionAdding: false,
                isAdminPositionAdded: true,
                ...action.payload
            }
        case ADMIN_POSITION_EDITING:
            return {
                ...state,
                isAdminPositionEditing: true,
                isAdminPositionEdited: false,
                ...action.payload
            }
        case ADMIN_POSITION_EDITED:
            return {
                ...state,
                isAdminPositionEditing: false,
                isAdminPositionEdited: true,
                ...action.payload
            }
        case ADMIN_POSITION_DELETING:
            return {
                ...state,
                isAdminPositionDeleting: true,
                isAdminPositionDeleted: false,
                ...action.payload
            }
        case ADMIN_POSITION_DELETED:
            return {
                ...state,
                isAdminPositionDeleting: false,
                isAdminPositionDeleted: true,
                ...action.payload
            }
        case ADMIN_POSITION_LOADING:
            return {
                ...state,
                isAdminPositionsLoading: true,
                isAdminPositionsLoaded: false,
                ...action.payload
            }
        case ADMIN_POSITION_LOADED:
            return {
                ...state,
                isAdminPositionsLoading: false,
                isAdminPositionsLoaded: true,
                ...action.payload
            }
        case ADMIN_CANDIDATE_LOADING:
            return {
                ...state,
                isAdminCandidateLoading: true,
                isAdminCandidateLoaded: false,
                ...action.payload
            }
        case ADMIN_CANDIDATE_LOADED:
            return {
                ...state,
                isAdminCandidateLoading: false,
                isAdminCandidateLoaded: true,
                ...action.payload
            }
        case ADMIN_CANDIDATES_LOADING:
            return {
                ...state,
                isAdminCandidatesLoading: true,
                isAdminCandidatesLoaded: false,
                ...action.payload
            }
        case ADMIN_CANDIDATES_LOADED:
            return {
                ...state,
                isAdminCandidatesLoading: false,
                isAdminCandidatesLoaded: true,
                ...action.payload
            }
        case ADMIN_CANDIDATE_VERIFYING:
            return {
                ...state,
                isAdminCandidateVerifying: true,
                isAdminCandidateVerified: false,
                ...action.payload
            }
        case ADMIN_CANDIDATE_VERIFIED:
            return {
                ...state,
                isAdminCandidateVerifying: false,
                isAdminCandidateVerified: true,
                ...action.payload
            }
        case ADMIN_CANDIDATE_UNVERIFYING:
            return {
                ...state,
                isAdminCandidateUnVerifying: true,
                isAdminCandidateUnVerified: false,
                ...action.payload
            }
        case ADMIN_CANDIDATE_UNVERIFIED:
            return {
                ...state,
                isAdminCandidateUnVerifying: false,
                isAdminCandidateUnVerified: true,
                ...action.payload
            }
        case ADMIN_ELECTION_STARTING:
            return {
                ...state,
                isAdminElectionStarting: true,
                isAdminElectionStarted: false,
                ...action.payload
            }
        case ADMIN_ELECTION_STATRTED:
            return {
                ...state,
                isAdminElectionStarting: false,
                isAdminElectionStarted: true,
                ...action.payload
            }
        case ADMIN_STUDENT_DELETING:
            return {
                ...state,
                isAdminStudentDeleted: false,
                isAdminStudentDeleting: true,
                ...action.payload
            }
        case ADMIN_STUDENT_DELETED:
            return {
                ...state,
                isAdminStudentDeleted: true,
                isAdminStudentDeleting: false,
                ...action.payload
            }
        case ADMIN_BATCH_UPDATING:
            return {
                ...state,
                isAdminBatchUpdated: false,
                isAdminBatchUpdating: true,
                ...action.payload
            }
        case ADMIN_BATCH_UPDATED:
            return {
                ...state,
                isAdminBatchUpdated: true,
                isAdminBatchUpdating: false,
                ...action.payload
            }

        case ADMIN_NOMINATION_TOGGLING:
            return {
                ...state,
                isAdminNominationToggling: true,
                isAdminNominationToggled: false,
                ...action.payload
            }
        case ADMIN_NOMINATION_TOGGLED:
            return {
                ...state,
                isAdminNominationToggling: false,
                isAdminNominationToggled: true,
                ...action.payload
            }

        default:
            return state;
    }
}