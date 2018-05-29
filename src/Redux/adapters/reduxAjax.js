import axios from 'axios';

import { API_KEY } from '../constants/apiInfo';
import { actionTypes } from '../constants/actionTypes';

export default function reduxAjax({ requestAction, successAction, errorAction, method = 'GET', params, url, auth = true, axiosArgs = {} }) {
    const sessionId = sessionStorage.getItem('sessionId');

    axiosArgs.headers = {};

    if (auth) {
        axiosArgs.headers['Key'] = API_KEY;
        axiosArgs.headers['SessionId'] = sessionId;
    } else {
        axiosArgs.headers['Key'] = API_KEY;
    }

    if (method === 'GET') {
        axiosArgs.params = params;
    } else {
        axiosArgs.data = params;
    }

    return dispatch => {
        if (requestAction) {
            dispatch(requestAction(axiosArgs.params));
        }

        return axios({
            ...axiosArgs,
            url,
            method
        }).then(response => {
            if (successAction) {
                dispatch(successAction(response.data))
            }

            return response.data;

        }).catch(error => {
            if (errorAction) {
                dispatch(errorAction(error.response.data));
            }
        });
    }
}