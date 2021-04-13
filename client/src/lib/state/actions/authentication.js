import { handleAuthRedirect } from 'realm-web'
import {
    LOGIN,
    LOGOUT
} from './actionTypes'

export const handleAuthErrors = (err) => {
    return {
        type: LOGIN,
        payload: { user:null, error: err},
    };
};

export const handleLogin = user => {
    return {
        type: LOGIN,
        payload: { user: user, error: null },
    };
};

export const handleLogout = () => {
    return { type: LOGOUT};
};