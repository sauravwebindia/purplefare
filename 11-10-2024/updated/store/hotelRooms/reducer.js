import { actionTypes } from './action';

export const initialState = {
    allHotelRooms: null,
    singleHotelRoom: null,
    error: false,
    totalHotelRooms: 0,
    categories: null,
    brands: [],
    hotelRoomsLoading: true,
    hotelRoomLoading: true,
    searchResults: null,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_HOTEL_ROOMS_SUCCESS:
            return {
                ...state,
                ...{ allHotelRooms: action.data, hotelRoomsLoading: false },
            };
        case actionTypes.GET_TOTAL_OF_HOTEL_ROOMS_SUCCESS:
            return {
                ...state,
                ...{ totalHotelRooms: action.payload },
            };
        case actionTypes.GET_BRANDS_SUCCESS:
            return {
                ...state,
                ...{ brands: action.payload },
            };
        case actionTypes.GET_HOTEL_ROOM_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{ categories: action.payload },
            };
        case actionTypes.GET_HOTEL_ROOM_BY_ID_SUCCESS:
            return {
                ...state,
                ...{ singleHotelRoom: action.data, hotelRoomsLoading: false },
            };
        case actionTypes.GET_HOTEL_ROOMS_BY_KEYWORD_SUCCESS:
            return {
                ...state,
                ...{ searchResults: action.payload },
            };

        case actionTypes.GET_HOTEL_ROOMS_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };

        default:
            return state;
    }
}

export default reducer;
