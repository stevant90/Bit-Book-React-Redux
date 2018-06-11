import { actionTypes } from '../constants/actionTypes';

const initialState = {
    comments: [],
    errorMessage: null
};

export default function comments(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_COMMENTS:
            return {
                ...state,
                comments: [],
                errorMessage: null
            };

        case actionTypes.RECEIVED_COMMENTS:
            return {
                ...state,
                comments: action.data,
                errorMessage: null
            };

        case actionTypes.ERROR_COMMENTS:
            return {
                ...state,
                comments: [],
                errorMessage: 'Something went wrong!'
            };

        default:
            return state;
    }
}