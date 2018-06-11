import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestComments = () => ({
    type: actionTypes.REQUEST_COMMENTS
});

const receivedComments = data => ({
    type: actionTypes.RECEIVED_COMMENTS,
    data
});

const errorComments = error => ({
    type: actionTypes.ERROR_COMMENTS,
    error
});

export const fetchComments = postId => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestComments,
            successAction: receivedComments,
            errorAction: errorComments,
            auth: true,
            method: 'GET',
            url: `${BASE_URL}/api/Comments?postId=${postId}`
        }));
    }
}