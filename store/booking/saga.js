import { all, put, takeEvery } from 'redux-saga/effects';


import {
    actionTypes,
    getHotelBookingError,
    getHotelBookingSuccess,
    updateHotelBookingSuccess,
    updateHotelBookingError,
} from './action';

const modalSuccess = (type) => {
    
};
const modalWarning = (type) => {
    
};

export const calculateAmount = (obj) =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);

function* getHotelBookingSaga() {
    try {
        yield put(getHotelBookingSuccess());
    } catch (err) {
        yield put(getHotelBookingError(err));
    }
}

function* addRoomSaga(payload) {
    try {
        const { room } = payload;
        const localHotelBooking = JSON.parse(localStorage.getItem('persist:purplefare'))
            .cart;
        let currentHotelBooking = JSON.parse(localHotelBooking);
        let existItem = currentHotelBooking.hotelBookingRooms.find(
            (item) => item.id === product.id
        );
        if (!existItem) {
            if (!product.quantity) {
                product.quantity = 1;
            }
            currentHotelBooking.hotelBookingRooms.push(product);
			currentHotelBooking.amount = calculateAmount(currentHotelBooking.hotelBookingRooms);
			currentHotelBooking.cartTotal++;
			yield put(updateHotelBookingSuccess(currentHotelBooking));
			//modalSuccess('success');
        }else{
			//modalWarning('warning');
		}        
    } catch (err) {
        yield put(getHotelBookingError(err));
    }
}

function* removeRoomSaga(payload) {
    try {
        const { product } = payload;
        let localHotelBooking = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).cart
        );
        let index = localHotelBooking.hotelBookingRooms.findIndex(
            (item) => item.id === product.id
        );
		localHotelBooking.cartTotal = localHotelBooking.cartTotal - product.quantity;
		localHotelBooking.hotelBookingRooms.splice(index, 1);
		localHotelBooking.amount = calculateAmount(localHotelBooking.hotelBookingRooms);
		if (localHotelBooking.hotelBookingRooms.length === 0) {
			localHotelBooking.hotelBookingRooms = [];
			localHotelBooking.amount = 0;
			localHotelBooking.cartTotal = 0;
		}
		yield put(updateHotelBookingSuccess(localHotelBooking));
		//modalWarning('warning');		
    } catch (err) {
        yield put(getHotelBookingError(err));
    }
}

function* increaseRoomQtySaga(payload) {
    try {
        const { room } = payload;
        let localHotelBooking = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).hotelBooking
        );
        let selectedItem = localHotelBooking.hotelBookingRooms.find(
            (item) => item.id === room.id
        );
        if (selectedItem) {
            selectedItem.quantity++;
            localHotelBooking.hotelBookingTotal++;
            localHotelBooking.amount = calculateAmount(localHotelBooking.hotelBookingRooms);
        }
        yield put(updateHotelBookingSuccess(localHotelBooking));
    } catch (err) {
        yield put(getHotelBookingError(err));
    }
}

function* decreaseRoomQtySaga(payload) {
    try {
        const { room } = payload;
        const localHotelBooking = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).hotelBooking
        );
        let selectedItem = localHotelBooking.hotelBookingRooms.find(
            (item) => item.id === room.id
        );

        if (selectedItem) {
            selectedItem.quantity--;
            localHotelBooking.hotelBookingTotal--;
            localHotelBooking.amount = calculateAmount(localHotelBooking.hotelBookingRooms);
        }
        yield put(updateHotelBookingSuccess(localHotelBooking));
    } catch (err) {
        yield put(getHotelBookingError(err));
    }
}

function* clearHotelBookingSaga() {
    try {
        const emptyHotelBooking = {
            hotelBookingRooms: [],
            amount: 0,
            cartTotal: 0,
        };
        yield put(updateHotelBookingSuccess(emptyHotelBooking));
    } catch (err) {
        yield put(updateHotelBookingError(err));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_HOTEL_BOOKING, getHotelBookingSaga)]);
    yield all([takeEvery(actionTypes.CLEAR_HOTEL_BOOKING, clearHotelBookingSaga)]);
    yield all([takeEvery(actionTypes.ADD_ROOM, addRoomSaga)]);
    yield all([takeEvery(actionTypes.REMOVE_ROOM, removeRoomSaga)]);
    yield all([takeEvery(actionTypes.INCREASE_ROOM_QTY, increaseRoomQtySaga)]);
    yield all([takeEvery(actionTypes.DECREASE_ROOM_QTY, decreaseRoomQtySaga)]);
}
