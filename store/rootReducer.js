import { combineReducers } from 'redux';
import hotelBooking from './booking/reducer';
import compare from './compare/reducer';
import auth from './auth/reducer';
import wishlist from './wishlist/reducer';

export default combineReducers({
    auth,
    hotelBooking,
    compare,
    wishlist,
});
