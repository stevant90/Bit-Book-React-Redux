import { actionTypes } from '../../constants/actionTypes';
import reduxAjax from '../../adapters/reduxAjax';
import { BASE_URL } from '../../constants/apiInfo';

const requestUploadImage = () => ({
    type: actionTypes.REQUEST_UPLOAD_IMAGE
});

const receivedUploadImage = data => ({
    type: actionTypes.RECEIVED_UPLOAD_IMAGE,
    data
});

const errorUploadImage = error => ({
    type: actionTypes.ERROR_UPLOAD_IMAGE,
    error
});

export const uploadImage = (params, callback) => {
    const formData = new FormData();
    formData.append('file', params);

    return dispatch => {
        dispatch(reduxAjax({
            requestAction: requestUploadImage,
            successAction: receivedUploadImage,
            errorAction: errorUploadImage,
            auth: true,
            params: formData,
            method: 'POST',
            url: `${BASE_URL}/api/upload`
        })).then(response => {
            callback(response);
        }).catch(error => { });
    }
}