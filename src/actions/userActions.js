import {
    USERS_GET_REQUEST,
    USERS_GET_SUCCESS,
    USERS_GET_ERROR,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_ERROR,

    USER_CHANGE_REQUEST,
    USER_CHANGE_SUCCESS,
    USER_CHANGE_ERROR
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

export function deleteUser(userId) {
    return async (dispatch) => {
        dispatch({
            type: USER_DELETE_REQUEST
        });

        try {
            await restService.deleteUser(userId);
            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: userId
            })
        } catch {
            dispatch({
                type: USER_DELETE_ERROR
            })
        }
    }
}

export function changeUser(userId, userName, userRoles) {
    return async (dispatch) => {
        dispatch({
            type: USER_CHANGE_REQUEST
        });

        try {
            await restService.changeUser(userId, userName, userRoles);
            dispatch({
                type: USER_CHANGE_SUCCESS,
                payload: {
                    userId,
                    userName,
                    userRoles
                }
            })
        } catch {
            dispatch({
                type: USER_CHANGE_ERROR
            })
        }
    }
}
