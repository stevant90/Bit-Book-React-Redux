import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestDeletePost = () => ({
    type: actionTypes.REQUEST_DELETE_POST
});

const receivedDeletePost = () => ({
    type: actionTypes.RECEIVED_DELETE_POST
});

const errorDeletePost = error => ({
    type: actionTypes.ERROR_DELETE_POST,
    error
});

export const deletePost = (id, callback) => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestDeletePost,
            successAction: receivedDeletePost,
            errorAction: errorDeletePost,
            auth: true,
            method: 'DELETE',
            url: `${BASE_URL}/api/Posts/${id}`
        })).then(response => {
            callback();
        }).catch(error => { });
    }
}