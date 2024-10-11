import { actionTypes } from './action';

export const initRooms = {
    roomItems: [],
    totalRooms: 0,
};

function reducer(state = initRooms, action) {
    switch (action.type) {
        case actionTypes.GET_ROOM_ITEMS_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.GET_ROOM_ITEMS_ERROR:
            return {
                ...state,
				...{ error: action.error },
            };
        case actionTypes.UPDATE_ROOM_ITEMS_SUCCESS:
            return {
                ...state,
                ...{ roomItems: action.payload.roomItems},
                ...{ totalRooms: action.payload.totalRooms },
            };
        case actionTypes.CLEAR_ROOM_ITEMS_SUCCESS:
            return {
                ...state,
                ...{ roomItems: action.payload.roomItems},
                ...{ totalRooms: action.payload.totalRooms },
            };
        case actionTypes.CLEAR_ROOM_ITEMS_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.UPDATE_ROOM_ITEMS_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        default:
            return state;
    }
}

export default reducer;
