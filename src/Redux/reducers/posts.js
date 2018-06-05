import { actionTypes } from '../constants/actionTypes';

const initialState = {
    posts: [],
    errorMessage: null
};

export default function posts(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_POSTS:
            return {
                ...state,
                posts: [],
                errorMessage: null
            };

        case actionTypes.RECEIVED_POSTS:
            return {
                ...state,
                posts: action.data,
                errorMessage: null
            };

        case actionTypes.ERROR_POSTS:
            return {
                ...state,
                posts: [],
                errorMessage: 'Something went wrong!'
            };

        default:
            return state;
    }
}