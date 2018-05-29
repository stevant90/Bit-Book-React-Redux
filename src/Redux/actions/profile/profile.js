import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestProfile = () => ({
    type: actionTypes.REQUEST_PROFILE
});

const receivedProfile = data => ({
    type: actionTypes.RECEIVED_PROFILE,
    data
});

const errorProfile = error => ({
    type: actionTypes.ERROR_PROFILE,
    error
});

export const fetchProfile = () => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestProfile,
            successAction: receivedProfile,
            errorAction: errorProfile,
            auth: true,
            method: 'GET',
            url: `${BASE_URL}/api/profile`
        }));
    }
}