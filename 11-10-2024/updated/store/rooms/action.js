export const actionTypes = {
    GET_ROOM_ITEMS: 'GET_ROOM_ITEMS',
    GET_ROOM_ITEMS_SUCCESS: 'GET_ROOM_ITEMS_SUCCESS',
    GET_ROOM_ITEMS_ERROR: 'GET_ROOM_ITEMS_ERROR',

    ADD_ROOM_ITEM: 'ADD_ROOM_ITEM',
    REMOVE_ROOM_ITEM: 'REMOVE_ROOM_ITEM',

    CLEAR_ROOM_ITEMS: 'CLEAR_ROOM_ITEMS',
    CLEAR_ROOM_ITEMS_SUCCESS: 'CLEAR_ROOM_ITEMS_SUCCESS',
    CLEAR_ROOM_ITEMS_ERROR: 'CLEAR_ROOM_ITEMS_ERROR',

    UPDATE_ROOM_ITEMS: 'UPDATE_ROOM_ITEMS',

    UPDATE_ROOM_ITEMS_SUCCESS: 'UPDATE_ROOM_ITEMS_SUCCESS',
    UPDATE_ROOM_ITEMS_ERROR: 'UPDATE_ROOM_ITEMS_ERROR',
};

export function getRoomItems() {
    return { type: actionTypes.GET_ROOM_ITEMS };
}

export function clearRoomItems() {
    return { type: actionTypes.CLEAR_ROOM_ITEMS };
}

export function getRoomItemsSuccess() {
    return {
        type: actionTypes.GET_ROOM_ITEMS_SUCCESS,
    };
}

export function getRoomItemsError(error) {
    return {
        type: actionTypes.GET_ROOM_ITEMS_ERROR,
        error,
    };
}

export function addRoomItem(room) {
    return { type: actionTypes.ADD_ROOM_ITEM, room };
}

export function removeRoomItem(room) {
    return { type: actionTypes.REMOVE_ROOM_ITEM, room };
}

export function updateRoomItemsSuccess(payload) {
    return {
        type: actionTypes.UPDATE_ROOM_ITEMS_SUCCESS,
        payload,
    };
}

export function updateRoomItemsError(payload) {
    return {
        type: actionTypes.UPDATE_ROOM_ITEMS_ERROR,
        payload,
    };
}
