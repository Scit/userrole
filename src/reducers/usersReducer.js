import {
    USERS_GET_SUCCESS,
    USER_DELETE_SUCCESS
} from '../constants/actions';

export default (state = [], action) => {
    let result;
    switch(action.type) {
        case USERS_GET_SUCCESS:
            result = usersGetSuccess(state, action);
            break;
        case USER_DELETE_SUCCESS:
            result = usersDeleteSuccess(state, action);
        default:
            result = state;
            break;
    }

    return result;
};

function usersGetSuccess(state, { payload }) {
    return payload;
}

function usersDeleteSuccess(state, { payload: id }) {
    const indexOf = state.indexOf(user => user.userId === id);
    return state.concat().splice(indexOf, 1);
}
