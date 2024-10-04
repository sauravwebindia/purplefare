import { all, put, takeEvery } from 'redux-saga/effects';


import {
    actionTypes,
    getRoomItemsError,
    getRoomItemsSuccess,
    updateRoomItemsSuccess,
    updateRoomItemsError,
} from './action';

const modalSuccess = (type) => {
    
};
const modalWarning = (type) => {
    
};

function* getRoomItemsSaga() {
    try {
        yield put(getRoomItemsSuccess());
    } catch (err) {
        yield put(updateRoomItemsError(err));
    }
}

function* addRoomItemSaga(payload) {
    try {
        const { room } = payload;
        const localRooms = JSON.parse(localStorage.getItem('persist:purplefare'))
            .rooms;
        let currentRooms = JSON.parse(localRooms);
        currentRooms.roomItems = [];
        currentRooms.roomItems = room;
        currentRooms.totalRooms = currentRooms.roomItems.length;
        yield put(updateRoomItemsSuccess(currentRooms));       
    } catch (err) {
        yield put(updateRoomItemsError(err));
    }
}

function* removeRoomItemSaga(payload) {
    try {
        const { room } = payload;
        let localRooms = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).rooms
        );
        let index = localRooms.roomItems.findIndex(
            (item) => item.code === room.code
        );
		localRooms.roomItems.splice(index, 1);
		localRooms.totalRooms = localRooms.roomItems.length;
		if (localRooms.roomItems.length === 0) {
            localRooms.roomItems = [];
			localRooms.totalRooms = 0;
		}
		yield put(updateRoomItemsSuccess(localRooms));
		//modalWarning('warning');		
    } catch (err) {
        yield put(updateRoomItemsError(err));
    }
}

function* clearRoomItemsSaga() {
    try {
        const emptyRooms = {
            roomItems: [],
            totalRooms: 0,
        };
        yield put(updateRoomItemsSuccess(emptyRooms));
    } catch (err) {
        yield put(updateRoomItemsError(err));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_ROOM_ITEMS, getRoomItemsSaga)]);
    yield all([takeEvery(actionTypes.CLEAR_ROOM_ITEMS, clearRoomItemsSaga)]);
    yield all([takeEvery(actionTypes.ADD_ROOM_ITEM, addRoomItemSaga)]);
    yield all([takeEvery(actionTypes.REMOVE_ROOM_ITEM, removeRoomItemSaga)]);
}
