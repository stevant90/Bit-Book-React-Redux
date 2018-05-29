import { actionTypes } from '../constants/actionTypes';
import _ from 'lodash';

const initialState = {
    errorMessage: null,
    users: []
};

export default function users(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_USERS:
            return {
                ...state,
                errorMessage: null,

            };

        case actionTypes.RECEIVED_USERS:
            return {
                ...state,
                errorMessage: null,
                users: action.data
            };

        case actionTypes.ERROR_USERS:
            return {
                ...state,
                errorMessage: 'Something went wrong. Please try again later'
            };

        default:
            return state;
    }
}