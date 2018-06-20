import { actionTypes } from '../../constants/actionTypes';

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('sessionId');
        dispatch({ type: actionTypes.REQUEST_LOGOUT });
    }
}