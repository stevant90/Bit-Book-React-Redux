import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestPosts = () => ({
    type: actionTypes.REQUEST_POSTS
});

const receivedPosts = data => ({
    type: actionTypes.RECEIVED_POSTS,
    data
});

const errorPosts = error => {
    type: actionTypes.ERROR_POSTS,
        error
}

export const fetchPosts = () => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestPosts,
            successAction: receivedPosts,
            errorAction: errorPosts,
            auth: true,
            method: 'GET',
            url: `${BASE_URL}/api/Posts`
        }));
    }
}