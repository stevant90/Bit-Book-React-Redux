import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestUpdateProfile = () => ({
    type: actionTypes.REQUEST_UPDATE_PROFILE
});

const receivedUpdateProfile = data => ({
    type: actionTypes.RECEIVED_UPDATE_PROFILE,
    data
});

const errorUpdateProfile = error => ({
    type: actionTypes.ERROR_UPDATE_PROFILE,
    error
});

export const updateProfile = (params, callback) => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestUpdateProfile,
            successAction: receivedUpdateProfile,
            errorAction: errorUpdateProfile,
            auth: true,
            params,
            method: 'PUT',
            url: `${BASE_URL}/api/Profiles`
        })).then(response => {
            callback();
        }).catch(error => { });
    }
}
