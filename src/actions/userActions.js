import {
    USERS_GET_REQUEST,
    USERS_GET_SUCCESS,
    USERS_GET_ERROR,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_ERROR
} from '../constants/actions';
import restService from '../services/restService';

export function getUsers() {
    return async (dispatch) => {
        dispatch({
            type: USERS_GET_REQUEST
        });

        try {
            const result = await restService.getUserList();
            dispatch({
                type: USERS_GET_SUCCESS,
                payload: result
            })
        } catch {
            dispatch({
                type: USERS_GET_ERROR
            })
        }

    }
}

export function deleteUser(id) {
    return async (dispatch) => {
        dispatch({
            type: USER_DELETE_REQUEST
        });

        try {
            await restService.deleteUser(id);
            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: id
            })
        } catch {
            dispatch({
                type: USER_DELETE_ERROR
            })
        }

    }
}
