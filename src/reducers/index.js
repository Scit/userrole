import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import rolesReduces from './rolesReducer';

export default combineReducers({
    users: usersReducer,
    roles: rolesReduces
});
