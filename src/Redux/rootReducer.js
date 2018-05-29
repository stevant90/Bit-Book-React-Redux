import { combineReducers } from 'redux';
import registerStatus from './reducers/registerStatus';
import loginStatus from './reducers/loginStatus';
import users from './reducers/users';
import singleUser from './reducers/singleUser';
import profile from './reducers/profile';
import updateProfile from './reducers/updateProfile';


export default combineReducers({
    registerStatus,
    loginStatus,
    users,
    singleUser,
    profile,
    updateProfile
});
