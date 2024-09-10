export const actionTypes = {
    GET_HOTEL_BOOKING: 'GET_HOTEL_BOOKING',
    GET_HOTEL_BOOKING_SUCCESS: 'GET_HOTEL_BOOKING_SUCCESS',
    GET_HOTEL_BOOKING_ERROR: 'GET_HOTEL_BOOKING_ERROR',

    GET_HOTEL_BOOKING_TOTAL_QUANTITY: 'GET_HOTEL_BOOKING_TOTAL_QUANTITY',
    GET_HOTEL_BOOKING_TOTAL_QUANTITY_SUCCESS: 'GET_HOTEL_BOOKING_TOTAL_QUANTITY_SUCCESS',

    ADD_ROOM: 'ADD_ROOM',
    REMOVE_ROOM: 'REMOVE_ROOM',

    CLEAR_HOTEL_BOOKING: 'CLEAR_HOTEL_BOOKING',
    CLEAR_HOTEL_BOOKING_SUCCESS: 'CLEAR_HOTEL_BOOKING_SUCCESS',
    CLEAR_HOTEL_BOOKING_ERROR: 'CLEAR_HOTEL_BOOKING_ERROR',

    INCREASE_ROOM_QTY: 'INCREASE_ROOM_QTY',
    INCREASE_ROOM_QTY_SUCCESS: 'INCREASE_ROOM_QTY_SUCCESS',
    INCREASE_ROOM_QTY_ERROR: 'INCREASE_ROOM_QTY_ERROR',

    DECREASE_ROOM_QTY: 'DECREASE_ROOM_QTY',
    UPDATE_HOTEL_BOOKING: 'UPDATE_HOTEL_BOOKING',

    UPDATE_HOTEL_BOOKING_SUCCESS: 'UPDATE_HOTEL_BOOKING_SUCCESS',
    UPDATE_HOTEL_BOOKING_ERROR: 'UPDATE_HOTEL_BOOKING_ERROR',
};

export function getHotelBooking() {
    return { type: actionTypes.GET_HOTEL_BOOKING };
}

export function clearHotelBooking() {
    return { type: actionTypes.CLEAR_HOTEL_BOOKING };
}

export function getHotelBookingSuccess() {
    return {
        type: actionTypes.GET_HOTEL_BOOKING_SUCCESS,
    };
}

export function getHotelBookingError(error) {
    return {
        type: actionTypes.GET_HOTEL_BOOKING_ERROR,
        error,
    };
}

export function addRoom(room) {
    return { type: actionTypes.ADD_ROOM, room };
}

export function removeRoom(room) {
    return { type: actionTypes.REMOVE_ROOM, room };
}

export function increaseRoomQty(room) {
    return { type: actionTypes.INCREASE_ROOM_QTY, room };
}

export function decreaseRoomQty(room) {
    return { type: actionTypes.DECREASE_ROOM_QTY, room };
}

export function updateHotelBookingSuccess(payload) {
    return {
        type: actionTypes.UPDATE_HOTEL_BOOKING_SUCCESS,
        payload,
    };
}

export function updateHotelBookingError(payload) {
    return {
        type: actionTypes.UPDATE_HOTEL_BOOKING_ERROR,
        payload,
    };
}
