import { actionTypes } from '../constants/actionTypes';

const initialState = {
    errorMessage: null,
    isLoading: false,
};

export default function updateProfile(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_UPDATE_PROFILE:
            return {
                ...state,
                errorMessage: null,
                isLoading: true
            };
        case actionTypes.RECEIVED_UPDATE_PROFILE:
            return {
                ...state,
                errorMessage: null,
                isLoading: false
            };
        case actionTypes.ERROR_UPDATE_PROFILE:
            return {
                ...state,
                isLoading: false,
                errorMessage: 'Something went wrong. Please try again later',
            };
        case actionTypes.CLEAR_FORM_STATUS:
            return initialState;
        default:
            return state;
    }
}