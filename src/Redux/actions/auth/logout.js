import { actionTypes } from '../../constants/actionTypes';

export const logout = () => {
    return dispatch => {
        sessionStorage.removeItem('sessionId');
        dispatch({ type: actionTypes.REQUEST_LOGOUT });
    }
}