import { actionTypes } from './action';

export const initUser = {
    isLoggedIn: false,
	user: null,
};

function reducer(state = initUser, action) {
	switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: true },
				...{ user: action.user},
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: false },
				...{ user: action.user},
            };
        default:
            return state;
    }
}

export default reducer;
