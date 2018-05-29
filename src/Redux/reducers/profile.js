import { actionTypes } from '../constants/actionTypes';

const initialState = {
    errorMessage: null,
    profile: {}
};

export default function profile(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_PROFILE:
            return {
                ...state,
                errorMessage: null,
                profile: {}
            };
        case actionTypes.RECEIVED_PROFILE:
            return {
                ...state,
                errorMessage: null,
                profile: action.data
            };
        case actionTypes.ERROR_PROFILE:
            return {
                ...state,
                errorMessage: 'Something went wrong. Please try again later'
            };
        default:
            return state;
    }
}