import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestSinglePost = () => ({
    type: actionTypes.REQUEST_SINGLE_POST
});

const receivedSinglePost = data => ({
    type: actionTypes.RECEIVED_SINGLE_POST,
    data
});

const errorSinglePost = error => ({
    type: actionTypes.ERROR_SINGLE_POST,
    error
});

export const fetchSinglePost = (type, postId) => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestSinglePost,
            successAction: receivedSinglePost,
            errorAction: errorSinglePost,
            auth: true,
            method: 'GET',
            url: `${BASE_URL}/api/${type}/${postId}`
        }));
    }
}