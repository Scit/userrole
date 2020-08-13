import {
    USERS_GET_SUCCESS
} from '../constants/actions';

export default (state = [], action) => {
    let result;
    switch(action.type) {
        case USERS_GET_SUCCESS:
            result = usersGetSuccess(state, action);
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
