import {
    USERS_GET_REQUEST,
    USERS_GET_SUCCESS,
    USERS_GET_ERROR
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