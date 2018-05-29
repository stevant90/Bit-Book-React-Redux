import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestRegister = () => ({
    type: actionTypes.REQUEST_REGISTER
});

const receivedRegister = data => ({
    type: actionTypes.RECEIVED_REGISTER,
    data
});

const errorRegister = error => ({
    type: actionTypes.ERROR_REGISTER,
    error
});

export const register = (params) => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestRegister,
            successAction: receivedRegister,
            errorAction: errorRegister,
            method: 'POST',
            auth: false,
            params,
            url: `${BASE_URL}/api/register`,
        }));
    }
}