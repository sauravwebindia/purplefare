import { actionTypes } from './action';

export const initHotelBooking = {
    hotelBookingRooms: [],
    amount: 0,
    saleAmount: 0,
    taxes: 0,
    totalAdults: 0,
    totalChild: 0,
    totalRooms: 0,
    currency: "",
    hotelBookingTotal: 0,
};

function reducer(state = initHotelBooking, action) {
    switch (action.type) {
        case actionTypes.GET_HOTEL_BOOKING_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.UPDATE_HOTEL_BOOKING_SUCCESS:
            return {
                ...state,
                ...{ hotelBookingRooms: action.payload.hotelBookingRooms },
                ...{ amount: action.payload.amount },
                ...{ saleAmount: action.payload.saleAmount },
                ...{ taxes: action.payload.taxes },
                ...{ totalAdults: action.payload.totalAdults},
                ...{ totalChild: action.payload.totalChild},
                ...{ totalRooms: action.payload.totalRooms},
                ...{ currency: action.payload.currency},
                ...{ hotelBookingTotal: action.payload.hotelBookingTotal },
            };
        case actionTypes.CLEAR_HOTEL_BOOKING_SUCCESS:
            return {
                ...state,
                ...{ hotelBookingRooms: action.payload.hotelBookingRooms },
                ...{ amount: action.payload.amount },
                ...{ saleAmount: action.payload.saleAmount },
                ...{ taxes: action.payload.taxes },
                ...{ totalAdults: action.payload.totalAdults},
                ...{ totalChild: action.payload.totalChild},
                ...{ totalRooms: action.payload.totalRooms},
                ...{ currency: action.payload.currency},
                ...{ hotelBookingTotal: action.payload.hotelBookingTotal },
            };
        case actionTypes.GET_HOTEL_BOOKING_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.UPDATE_HOTEL_BOOKING_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        default:
            return state;
    }
}

export default reducer;
