import { actionTypes } from '../constants/actionTypes';

const initialState = {
    errorMessage: null,
};

export default function uploadImage(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_UPLOAD_IMAGE:
            return {
                ...state,
                errorMessage: null,
            };
        case actionTypes.RECEIVED_UPLOAD_IMAGE:
            return {
                ...state,
                errorMessage: null,
            };
        case actionTypes.ERROR_UPLOAD_IMAGE:
            return {
                ...state,
                errorMessage: 'Upload failed!',
            };
        case actionTypes.CLEAR_FORM_STATUS:
            return initialState;
        default:
            return state;
    }
}