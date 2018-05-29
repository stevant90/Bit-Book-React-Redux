import { actionTypes } from '../constants/actionTypes';

const initialState = {
    errorMessage: null,
    successMessage: null,
    isLoading: false
};

export default function registerStatus(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_REGISTER:

            return {
                ...state,
                errorMessage: null,
                successMessage: null,
                isLoading: true
            };

        case actionTypes.RECEIVED_REGISTER:

            return {
                ...state,
                errorMessage: null,
                successMessage: 'You have successfully register! Now you can proceed with your first login',
                isLoading: false
            };

        case actionTypes.ERROR_REGISTER:
        
            return {
                ...state,
                errorMessage: action.error.error.message,
                successMessage: null,
                isLoading: false
            };

        case actionTypes.CLEAR_FORM_STATUS:

            return initialState;

        default:

            return state;
    }
}