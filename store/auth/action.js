export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
};

export function login(user) {
    return { type: actionTypes.LOGIN_REQUEST, user };
}

export function loginSuccess(user) {
    return { type: actionTypes.LOGIN_SUCCESS,user };
}

export function logOut(user) {
    return { type: actionTypes.LOGOUT,user };
}

export function logOutSuccess(user) {
    return { type: actionTypes.LOGOUT_SUCCESS,user };
}
