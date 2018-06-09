import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestNewPost = () => ({
    type: actionTypes.REQUEST_NEW_POST
});

const receivedNewPost = data => ({
    type: actionTypes.RECEIVED_NEW_POST,
    data
});

const errorNewPost = error => ({
    type: actionTypes.ERROR_NEW_POST,
    error
});

export const newPost = (params, type, callback) => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestNewPost,
            successAction: receivedNewPost,
            errorAction: errorNewPost,
            params,
            auth: true,
            method: 'POST',
            url: `${BASE_URL}/api/${type}Posts`
        })).then(response => {
            callback();
        }).catch(error => { });
    }
}