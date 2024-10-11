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
        .reduce((acc, { quantity, amount, taxes }) => acc + quantity * (taxes+amount), 0)
        .toFixed(2);

export const calculateSaleAmount = (obj) =>
    Object.values(obj)
        .reduce((acc, { quantity, saleAmount, taxes }) => acc + quantity * (taxes+saleAmount), 0)
        .toFixed(2);

export const calculateTaxes = (obj) =>
    Object.values(obj)
        .reduce((acc, { quantity, taxes }) => acc + quantity * taxes, 0)
        .toFixed(2);

export const calculateAdults = (obj) => 
    Object.values(obj)
        .reduce((acc, { quantity, adults }) => acc + quantity * adults, 0);

export const calculateChild = (obj) => 
    Object.values(obj)
        .reduce((acc, { quantity, child }) => acc + quantity * child, 0);

export const calculateRooms = (obj) => 
    Object.values(obj)
        .reduce((acc, { quantity, rooms }) => acc + quantity * rooms, 0);

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
            .hotelBooking;
        let currentHotelBooking = JSON.parse(localHotelBooking);
        let existItem = currentHotelBooking.hotelBookingRooms.find(
            (item) => item.id === room.id
        );
        if (!existItem) {
            if (!room.quantity) {
                room.quantity = 1;
            }
            let hotel = room.hotel;
            delete room.hotel;
            currentHotelBooking.hotelBookingRooms.push(room);
			currentHotelBooking.amount = calculateAmount(currentHotelBooking.hotelBookingRooms);
            currentHotelBooking.saleAmount = calculateSaleAmount(currentHotelBooking.hotelBookingRooms);
            currentHotelBooking.taxes = calculateTaxes(currentHotelBooking.hotelBookingRooms);
            currentHotelBooking.totalAdults = calculateAdults(currentHotelBooking.hotelBookingRooms);
            currentHotelBooking.totalChild = calculateChild(currentHotelBooking.hotelBookingRooms);
            currentHotelBooking.totalRooms = calculateRooms(currentHotelBooking.hotelBookingRooms);
            currentHotelBooking.currency = room.currency;
			currentHotelBooking.hotelBookingTotal++;
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
        const { room } = payload;
        let localHotelBooking = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).hotelBooking
        );
        let index = localHotelBooking.hotelBookingRooms.findIndex(
            (item) => item.id === room.id
        );
		localHotelBooking.hotelBookingTotal = localHotelBooking.hotelBookingTotal - room.quantity;
		localHotelBooking.hotelBookingRooms.splice(index, 1);
        localHotelBooking.amount = calculateAmount(localHotelBooking.hotelBookingRooms);
        localHotelBooking.saleAmount = calculateSaleAmount(localHotelBooking.hotelBookingRooms);
        localHotelBooking.taxes = calculateTaxes(localHotelBooking.hotelBookingRooms);
        localHotelBooking.totalAdults = calculateAdults(localHotelBooking.hotelBookingRooms);
        localHotelBooking.totalChild = calculateChild(localHotelBooking.hotelBookingRooms);
        localHotelBooking.totalRooms = calculateRooms(localHotelBooking.hotelBookingRooms);
        localHotelBooking.currency = room.currency;
		if (localHotelBooking.hotelBookingRooms.length === 0) {
			localHotelBooking.hotelBookingRooms = [];
			localHotelBooking.amount = 0;
            localHotelBooking.saleAmount = 0;
            localHotelBooking.taxes = 0;
            localHotelBooking.totalAdults = 0;
            localHotelBooking.totalChild = 0;
            localHotelBooking.totalRooms = 0;
            localHotelBooking.currency = "";
			localHotelBooking.hotelBookingTotal = 0;
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
            localHotelBooking.saleAmount = calculateSaleAmount(localHotelBooking.hotelBookingRooms);
            localHotelBooking.taxes = calculateTaxes(localHotelBooking.hotelBookingRooms);
            localHotelBooking.totalAdults = calculateAdults(localHotelBooking.hotelBookingRooms);
            localHotelBooking.totalChild = calculateChild(localHotelBooking.hotelBookingRooms);
            localHotelBooking.totalRooms = calculateRooms(localHotelBooking.hotelBookingRooms);
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
            localHotelBooking.saleAmount = calculateSaleAmount(localHotelBooking.hotelBookingRooms);
            localHotelBooking.taxes = calculateTaxes(localHotelBooking.hotelBookingRooms);
            localHotelBooking.totalAdults = calculateAdults(localHotelBooking.hotelBookingRooms);
            localHotelBooking.totalChild = calculateChild(localHotelBooking.hotelBookingRooms);
            localHotelBooking.totalRooms = calculateRooms(localHotelBooking.hotelBookingRooms);
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
            saleAmount: 0,
            taxes: 0,
            hotelBookingTotal: 0,
            totalAdults: 0,
            totalChild: 0,
            totalRooms: 0,
            currency: "",
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
