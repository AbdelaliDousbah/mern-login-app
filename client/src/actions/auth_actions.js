import { AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED } from './types';
import axios from 'axios';

const TOKEN_NAME = 'Login_app_token';

export const signIn = (request_data) => {
    return async dispatch => {
        try {
            dispatch({ type: AUTH_ATTEMPTING });
            const { data: { token } } = await axios.post('/api/v1/auth', request_data);
            dispatch(success(token));
        } catch (e) {
            const { response: { data } } = e;
            dispatch(error(data.error));
        }
    };
}

const success = (token) => {
    localStorage.setItem(TOKEN_NAME, token);
    return { type: AUTH_SUCCESS };
};
const error = (error) => {
    return { type: AUTH_FAILED, payload: error }
};