import { actionTypes } from '../constants/actionTypes';

const initialState = {
    errorMessage: null,
    isLoading: false
};

export default function newComment(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_NEW_COMMENT:
            return {
                ...state,
                errorMessage: null,
                isLoading: true
            };

        case actionTypes.RECEIVED_NEW_COMMENT:
            return {
                ...state,
                errorMessage: null,
                isLoading: false
            };

        case actionTypes.ERROR_NEW_COMMENT:
            return {
                ...state,
                errorMessage: 'Please try again',
                isLoading: false
            };

        case actionTypes.CLEAR_FORM_STATUS:
            return initialState;

        default:
            return state;
    }
}