import {
    ROLES_GET_SUCCESS
} from '../constants/actions';

export default (state = [], action) => {
    let result;
    switch(action.type) {
        case ROLES_GET_SUCCESS:
            result = rolesGetSuccess(state, action);
            break;
        default:
            result = state;
            break;
    }

    return result;
};

function rolesGetSuccess(state, { payload }) {
    return payload;
}
