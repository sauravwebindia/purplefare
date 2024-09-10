import { all } from 'redux-saga/effects';
import HotelBookingSaga from './booking/saga';
import AuthSaga from './auth/saga';
import CompareSaga from './compare/saga';
import WishlistSaga from './wishlist/saga';
export default function* rootSaga() {
    yield all([
        HotelBookingSaga(),
        AuthSaga(),
        CompareSaga(),
        WishlistSaga(),    
    ]);
}
