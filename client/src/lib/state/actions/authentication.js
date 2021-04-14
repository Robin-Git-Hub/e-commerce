import {
    LOGIN,
    LOGOUT
} from './actionTypes'

export const handleAuthenticationErrors = (err) => {
    return {
        type: LOGIN,
        payload: { user:null, error: null },
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