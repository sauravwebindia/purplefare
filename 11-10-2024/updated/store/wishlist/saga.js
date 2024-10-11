import { all, put, takeEvery } from 'redux-saga/effects';
import {
    actionTypes,
    getWishlistListSuccess,
    updateWishlistListSuccess,
} from './action';

const modalSuccess = type => {
    
};

const modalWarning = type => {
    
};

function* getWishlistListSaga() {
    try {
        const localWishlistList = JSON.parse(
            localStorage.getItem('persist:purplefare')
        ).wishlist;
        yield put(getWishlistListSuccess(localWishlistList));
    } catch (err) {
        console.log(err);
    }
}

function* addItemToWishlistSaga(payload) {
    try {
        const { product } = payload;
        let localWishlist = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).wishlist
        );

        let existItem = localWishlist.wishlistItems.find(
            item => item.id === product.id
        );

        if (!existItem) {
            localWishlist.wishlistItems.push(product);
            localWishlist.wishlistTotal++;
            yield put(updateWishlistListSuccess(localWishlist));
            //modalSuccess('success');
        }
    } catch (err) {
        console.log(err);
    }
}

function* removeItemWishlistSaga(payload) {
    try {
        const { product } = payload;
        let localWishlist = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).wishlist
        );
        let index = localWishlist.wishlistItems.findIndex(
            item => item.id === product.id 
        );
        localWishlist.wishlistTotal = localWishlist.wishlistTotal - 1;
        localWishlist.wishlistItems.splice(index, 1);
        yield put(updateWishlistListSuccess(localWishlist));
        modalWarning('warning');
    } catch (err) {
        console.log(err);
    }
}

function* clearWishlistListSaga() {
    try {
        const emptyCart = {
            wishlistItems: [],
            wishlistTotal: 0,
        };
        yield put(updateWishlistListSuccess(emptyCart));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_WISHLIST_LIST, getWishlistListSaga)]);
    yield all([
        takeEvery(actionTypes.ADD_ITEM_WISHLISH, addItemToWishlistSaga),
    ]);
    yield all([
        takeEvery(actionTypes.REMOVE_ITEM_WISHLISH, removeItemWishlistSaga),
    ]);
}
