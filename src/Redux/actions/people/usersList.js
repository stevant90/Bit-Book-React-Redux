import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestUsers = () => ({
    type: actionTypes.REQUEST_USERS
});

const receivedUsers = data => ({
    type: actionTypes.RECEIVED_USERS,
    data
});

const errorUsers = error => ({
    type: actionTypes.ERROR_USERS,
    error
});

export const fetchUsers = () => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestUsers,
            successAction: receivedUsers,
            errorAction: errorUsers,
            auth: true,
            method: 'GET',
            url: `${BASE_URL}/api/users`
        }));
    }
}
