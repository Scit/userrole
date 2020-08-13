import {
    ROLES_GET_REQUEST,
    ROLES_GET_SUCCESS,
    ROLES_GET_ERROR
} from '../constants/actions';
import restService from '../services/restService';

export function getRoles() {
    return async (dispatch) => {
        dispatch({
            type: ROLES_GET_REQUEST
        });

        try {
            const result = await restService.getRoleList();
            dispatch({
                type: ROLES_GET_SUCCESS,
                payload: result
            })
        } catch {
            dispatch({
                type: ROLES_GET_ERROR
            })
        }

    }
}
