import {
    USERS_GET_SUCCESS,
    USER_DELETE_SUCCESS,
    USER_CHANGE_SUCCESS
} from '../constants/actions';

export default (state = [], action) => {
    let result;
    switch(action.type) {
        case USERS_GET_SUCCESS:
            result = usersGetSuccess(state, action);
            break;
        case USER_DELETE_SUCCESS:
            result = userDeleteSuccess(state, action);
            break;
        case USER_CHANGE_SUCCESS:
            result = userChangeSuccess(state, action);
            break;
        default:
            result = state;
            break;
    }

    return result;
};

function usersGetSuccess(state, { payload }) {
    return payload;
}

function userDeleteSuccess(state, { payload: id }) {
    const indexOf = state.findIndex(user => user.userId === id);
    const newUserList = state.concat();
    newUserList.splice(indexOf, 1);
    return newUserList;
}

function userChangeSuccess(state, { payload }) {
    const { userId } = payload;
    const indexOf = state.findIndex(user => user.userId === userId);
    const newUserList = state.concat();
    newUserList[indexOf] = payload;
    return newUserList;
}
