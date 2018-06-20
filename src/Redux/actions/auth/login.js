import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestLogin = () => ({
    type: actionTypes.REQUEST_LOGIN
});

const receivedLogin = data => ({
    type: actionTypes.RECEIVED_LOGIN,
    data
});

const errorLogin = error => ({
    type: actionTypes.ERROR_LOGIN,
    error
});

export const login = (redirectCallback, params) => {
    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestLogin,
            successAction: receivedLogin,
            errorAction: errorLogin,
            params,
            auth: false,
            url: `${BASE_URL}/api/login`,
            method: 'POST'
        })).then(response => {
        
            localStorage.setItem('sessionId', response.sessionId);

            redirectCallback();
        }).catch(error => { });
    }
}