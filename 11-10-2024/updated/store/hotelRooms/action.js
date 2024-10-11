export const actionTypes = {
    GET_HOTEL_ROOMS: 'GET_HOTEL_ROOMS',
    GET_HOTEL_ROOMS_SUCCESS: 'GET_HOTEL_ROOMS_SUCCESS',
    GET_HOTEL_ROOMS_ERROR: 'GET_HOTEL_ROOMS_ERROR',

    GET_HOTEL_ROOMS_BY_CATEGORY: 'GET_HOTEL_ROOMS_BY_CATEGORY',
    GET_HOTEL_ROOMS_BY_PRICE_RANGE: 'GET_HOTEL_ROOMS_BY_PRICE_RANGE',
    GET_HOTEL_ROOMS_BY_BRAND: 'GET_HOTEL_ROOMS_BY_BRAND',
    GET_HOTEL_ROOMS_BY_KEYWORD: 'GET_HOTEL_ROOMS_BY_KEYWORD',
    GET_HOTEL_ROOMS_BY_KEYWORD_SUCCESS: 'GET_HOTEL_ROOMS_BY_KEYWORD_SUCCESS',

    GET_HOTEL_ROOM_BY_ID: 'GET_HOTEL_ROOM_BY_ID',
    GET_HOTEL_ROOM_BY_ID_SUCCESS: 'GET_HOTEL_ROOM_BY_ID_SUCCESS',


    GET_TOTAL_OF_HOTEL_ROOMS: 'GET_TOTAL_OF_HOTEL_ROOMS',
    GET_TOTAL_OF_HOTEL_ROOMS_SUCCESS: 'GET_TOTAL_OF_HOTEL_ROOMS_SUCCESS',

    GET_BRANDS: 'GET_BRANDS',
    GET_BRANDS_SUCCESS: 'GET_BRANDS_SUCCESS',

    GET_HOTEL_ROOM_CATEGORIES: 'GET_HOTEL_ROOM_CATEGORIES',
    GET_HOTEL_ROOM_CATEGORIES_SUCCESS: 'GET_HOTEL_ROOM_CATEGORIES_SUCCESS',
};

export function getHotelRooms(payload) {
    return { type: actionTypes.GET_HOTEL_ROOMS, payload };
}

export function getTotalHotelRooms() {
    return { type: actionTypes.GET_TOTAL_OF_HOTEL_ROOMS };
}

export function getBrands() {
    return { type: actionTypes.GET_BRANDS };
}

export function getBrandsSuccess(payload) {
    return { type: actionTypes.GET_BRANDS_SUCCESS, payload };
}

export function getHotelRoomCategories() {
    return { type: actionTypes.GET_HOTEL_ROOM_CATEGORIES };
}

export function getHotelRoomCategoriesSuccess(payload) {
    return { type: actionTypes.GET_HOTEL_ROOM_CATEGORIES_SUCCESS, payload };
}

export function getTotalHotelRoomsSuccess(payload) {
    return {
        type: actionTypes.GET_TOTAL_OF_HOTEL_ROOMS_SUCCESS,
        payload,
    };
}

export function getHotelRoomsSuccess(data) {
    return {
        type: actionTypes.GET_HOTEL_ROOMS_SUCCESS,
        data,
    };
}
export function getHotelRoomByKeywordsSuccess(payload) {
    return {
        type: actionTypes.GET_HOTEL_ROOMS_BY_KEYWORD_SUCCESS,
        payload,
    };
}

export function getSingleHotelRoomSuccess(data) {
    return {
        type: actionTypes.GET_HOTEL_ROOM_BY_ID_SUCCESS,
        data,
    };
}

export function getHotelRoomsError(error) {
    return {
        type: actionTypes.GET_HOTEL_ROOMS_ERROR,
        error,
    };
}

export function getHotelRoomsByCategory(category) {
    return {
        type: actionTypes.GET_HOTEL_ROOMS_BY_CATEGORY,
        category,
    };
}

export function getHotelRoomsByBrand(payload) {
    return {
        type: actionTypes.GET_HOTEL_ROOMS_BY_BRAND,
        payload,
    };
}

export function getHotelRoomsByKeyword(keyword) {
    return {
        type: actionTypes.GET_HOTEL_ROOMS_BY_KEYWORD,
        keyword,
    };
}

export function getHotelRoomById(id) {
    return {
        type: actionTypes.GET_HOTEL_ROOM_BY_ID,
        id,
    };
}

export function getHotelRoomsByPrice(payload) {
    return {
        type: actionTypes.GET_HOTEL_ROOMS_BY_PRICE_RANGE,
        payload,
    };
}
