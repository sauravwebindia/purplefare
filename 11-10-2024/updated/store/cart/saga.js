import { all, put, takeEvery } from 'redux-saga/effects';


import {
    actionTypes,
    getCartError,
    getCartSuccess,
    updateCartSuccess,
    updateCartError,
} from './action';

const modalSuccess = (type) => {
    
};
const modalWarning = (type) => {
    
};

export const calculateAmount = (obj) =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);

function* getCartSaga() {
    try {
        yield put(getCartSuccess());
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* addItemSaga(payload) {
    try {
        const { product } = payload;
        const localCart = JSON.parse(localStorage.getItem('persist:casioindiashop'))
            .cart;
        let currentCart = JSON.parse(localCart);
        let existItem = currentCart.cartItems.find(
            (item) => item.id === product.id
        );
        if (!existItem) {
            if (!product.quantity) {
                product.quantity = 1;
            }
            currentCart.cartItems.push(product);
			currentCart.amount = calculateAmount(currentCart.cartItems);
			currentCart.cartTotal++;
			yield put(updateCartSuccess(currentCart));
			//modalSuccess('success');
        }else{
			//modalWarning('warning');
		}        
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* removeItemSaga(payload) {
    try {
        const { product } = payload;
        let localCart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).cart
        );
        let index = localCart.cartItems.findIndex(
            (item) => item.id === product.id
        );
		localCart.cartTotal = localCart.cartTotal - product.quantity;
		localCart.cartItems.splice(index, 1);
		localCart.amount = calculateAmount(localCart.cartItems);
		if (localCart.cartItems.length === 0) {
			localCart.cartItems = [];
			localCart.amount = 0;
			localCart.cartTotal = 0;
		}
		yield put(updateCartSuccess(localCart));
		//modalWarning('warning');		
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* increaseQtySaga(payload) {
    try {
        const { product } = payload;
        let localCart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).cart
        );
        let selectedItem = localCart.cartItems.find(
            (item) => item.id === product.id
        );
        if (selectedItem) {
            selectedItem.quantity++;
            localCart.cartTotal++;
            localCart.amount = calculateAmount(localCart.cartItems);
        }
        yield put(updateCartSuccess(localCart));
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* decreaseItemQtySaga(payload) {
    try {
        const { product } = payload;
        const localCart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).cart
        );
        let selectedItem = localCart.cartItems.find(
            (item) => item.id === product.id
        );

        if (selectedItem) {
            selectedItem.quantity--;
            localCart.cartTotal--;
            localCart.amount = calculateAmount(localCart.cartItems);
        }
        yield put(updateCartSuccess(localCart));
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* clearCartSaga() {
    try {
        const emptyCart = {
            cartItems: [],
            amount: 0,
            cartTotal: 0,
        };
        yield put(updateCartSuccess(emptyCart));
    } catch (err) {
        yield put(updateCartError(err));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CART, getCartSaga)]);
    yield all([takeEvery(actionTypes.CLEAR_CART, clearCartSaga)]);
    yield all([takeEvery(actionTypes.ADD_ITEM, addItemSaga)]);
    yield all([takeEvery(actionTypes.REMOVE_ITEM, removeItemSaga)]);
    yield all([takeEvery(actionTypes.INCREASE_QTY, increaseQtySaga)]);
    yield all([takeEvery(actionTypes.DECREASE_QTY, decreaseItemQtySaga)]);
}
