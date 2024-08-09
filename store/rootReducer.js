import { combineReducers } from 'redux';
import cart from './cart/reducer';
import compare from './compare/reducer';
import auth from './auth/reducer';
import wishlist from './wishlist/reducer';

export default combineReducers({
    auth,
    cart,
    compare,
    wishlist,
});
