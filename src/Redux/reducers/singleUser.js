import { actionTypes } from '../constants/actionTypes';


const initialState = {
    errorMessage: null,
    user: {}
};

export default function singleUser(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_USER:

            return {
                ...state,
                errorMessage: null,
                user: {}
            };

        case actionTypes.RECEIVED_USER:

            return {
                ...state,
                errorMessage: null,
                user: action.data
            };

        case actionTypes.ERROR_USER:

            return {
                ...state,
                errorMessage: 'Something went wrong. Please try again later'
            };

        default:
            return state;
    }
}