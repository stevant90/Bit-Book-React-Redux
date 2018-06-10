import { actionTypes } from '../constants/actionTypes';

const initialState = {
    errorMessage: null
};

export default function deletePost(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_DELETE_POST:
            return {
                ...state,
                errorMessage: null
            };

        case actionTypes.RECEIVED_DELETE_POST:
            return {
                ...state,
                errorMessage: null
            };

        case actionTypes.ERROR_DELETE_POST:
            return {
                ...state,
                errorMessage: 'Delete failed! Please try again'
            };

        default:
            return state;
    }
}