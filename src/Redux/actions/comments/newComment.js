import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestNewComment = () => ({
    type: actionTypes.REQUEST_NEW_COMMENT
});

const receivedNewComment = data => ({
    type: actionTypes.RECEIVED_NEW_COMMENT,
    data
});

const errorNewComment = error => ({
    type: actionTypes.ERROR_NEW_COMMENT,
    error
});

export const newComment = (params, callback) => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestNewComment,
            successAction: receivedNewComment,
            errorAction: errorNewComment,
            params,
            auth: true,
            method: 'POST',
            url: `${BASE_URL}/api/Comments`
        })).then(response => {
            callback();
        }).catch(error => { });
    }
}