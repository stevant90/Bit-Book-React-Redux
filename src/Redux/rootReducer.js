import { combineReducers } from 'redux';
import registerStatus from './reducers/registerStatus';
import loginStatus from './reducers/loginStatus';
import users from './reducers/users';
import singleUser from './reducers/singleUser';
import profile from './reducers/profile';
import updateProfile from './reducers/updateProfile';
import uploadImage from './reducers/uploadImage';
import posts from './reducers/posts';
import singlePost from './reducers/singlePost';
import newPost from './reducers/newPost';
import deletePost from './reducers/deletePost';
import comments from './reducers/comments';
import newComment from './reducers/newComment';


export default combineReducers({
    registerStatus,
    loginStatus,
    users,
    singleUser,
    profile,
    updateProfile,
    uploadImage,
    posts,
    singlePost,
    newPost,
    deletePost,
    comments,
    newComment
});
