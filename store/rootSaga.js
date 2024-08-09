import { all } from 'redux-saga/effects';
import CartSaga from './cart/saga';
import AuthSaga from './auth/saga';
import CompareSaga from './compare/saga';
import WishlistSaga from './wishlist/saga';
export default function* rootSaga() {
    yield all([
        CartSaga(),
        AuthSaga(),
        CompareSaga(),
        WishlistSaga(),    
    ]);
}
