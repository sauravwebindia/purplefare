import { all, put, takeEvery } from 'redux-saga/effects';

import { actionTypes, loginSuccess, logOutSuccess } from './action';

const modalSuccess = type => {
    
};

const modalWarning = type => {
    
};

function* loginSaga(payload) {
	try {
		const { user } = payload;
		let loginUser = user;
		yield put(loginSuccess(loginUser));
		modalSuccess('success');
    } catch (err) {
        console.log(err);
    }
}

function* logOutSaga() {
    try {
		yield put(logOutSuccess());
        modalWarning();
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}
