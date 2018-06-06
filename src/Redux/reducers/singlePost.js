import { actionTypes } from '../constants/actionTypes';

const initialState = {
    errorMessage: null,
    post: {}
};

export default function singlePost(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_SINGLE_POST:
            return {
                ...state,
                errorMessage: null,
                post: {}
            };

        case actionTypes.RECEIVED_SINGLE_POST:
            return {
                ...state,
                errorMessage: null,
                post: action.data
            };

        case actionTypes.ERROR_SINGLE_POST:
            return {
                ...state,
                errorMessage: 'Something went wrong!',
                post: {}
            };

        default:
            return state;
    }
}