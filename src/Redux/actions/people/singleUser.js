import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestUser = () => ({
    type: actionTypes.REQUEST_USER
});

const receivedUser = data => ({
    type: actionTypes.RECEIVED_USER,
    data
});

const errorUser = error => ({
    type: actionTypes.ERROR_USER,
    error
});

export const fetchSingleUser = id => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestUser,
            successAction: receivedUser,
            errorAction: errorUser,
            auth: true,
            method: 'GET',
            url: `${BASE_URL}/api/users/${id}`
        }));
    }
}