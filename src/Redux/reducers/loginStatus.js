import { actionTypes } from '../constants/actionTypes';

let isLoggedIn;

try {
    isLoggedIn = !!localStorage.getItem('sessionId');
} catch (e) { }

const initialState = {
    errorMessage: null,
    isLoading: false,
    isLoggedIn
};


export default function loginStatus(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_LOGIN:

            return {
                ...state,
                errorMessage: null,
                isLoading: true,
                isLoggedIn: false,

            };

        case actionTypes.RECEIVED_LOGIN:

            return {
                ...state,
                errorMessage: null,
                isLoading: false,
                isLoggedIn: true,
            };

        case actionTypes.ERROR_LOGIN:

            return {
                ...state,
                errorMessage: action.error.error.message,
                isLoading: false,
                isLoggedIn: false,
            };


        case actionTypes.CLEAR_FORM_STATUS:

            return {
                ...state,
                errorMessage: null,
            };

        case actionTypes.REQUEST_LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };

        default:

            return state;
    }
}