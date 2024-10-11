import { all, put, takeEvery, call } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import ProductRepository from '@/repositories/ProductRepository';

import {
    actionTypes,
    getHotelRoomsError,
    getHotelRoomsSuccess,
    getSingleHotelRoomSuccess,
    getTotalHotelRoomsSuccess,
    getHotelRoomCategoriesSuccess,
    getBrandsSuccess,
    getHotelRoomByKeywordsSuccess,
} from './action';
polyfill();

function* getHotelRooms({ payload }) {
    try {
        const data = yield call(ProductRepository.getRecords, payload);
        yield put(getHotelRoomsSuccess(data));
    } catch (err) {
        yield put(getHotelRoomsError(err));
    }
}

function* getTotalOfProducts() {
    try {
        const result = yield call(ProductRepository.getTotalRecords);
        yield put(getTotalHotelRoomsSuccess(result));
    } catch (err) {
        console.log(err);
    }
}

function* getBrands() {
    try {
        const result = yield call(ProductRepository.getBrands);
        yield put(getBrandsSuccess(result));
    } catch (err) {
        console.log(err);
    }
}

function* getHotelRoomCategories() {
    try {
        const result = yield call(ProductRepository.getHotelRoomCategories);
        yield put(getHotelRoomCategoriesSuccess(result));
    } catch (err) {
        console.log(err);
    }
}

function* getProductById({ id }) {
    try {
        const product = yield call(ProductRepository.getHotelRoomsById, id);
        yield put(getSingleHotelRoomSuccess(product));
    } catch (err) {
        yield put(getHotelRoomsError(err));
    }
}

function* getProductByCategory({ category }) {
    try {
        const result = yield call(
            ProductRepository.getHotelRoomsByCategory,
            category
        );
        yield put(getHotelRoomsSuccess(result));
        yield put(getTotalHotelRoomsSuccess(result.length));
    } catch (err) {
        yield put(getHotelRoomsError(err));
    }
}

function* getProductByPriceRange({ payload }) {
    try {
        const products = yield call(
            ProductRepository.getHotelRoomsByPriceRange,
            payload
        );
        yield put(getHotelRoomsSuccess(products));
        yield put(getTotalHotelRoomsSuccess(products.length));
    } catch (err) {
        yield put(getHotelRoomsError(err));
    }
}

function* getProductByBrand({ payload }) {
    try {
        const brands = yield call(
            ProductRepository.getHotelRoomsByBrands,
            payload
        );
        const products = [];
        brands.forEach(brand => {
            brand.products.forEach(product => {
                products.push(product);
            });
        });
        yield put(getHotelRoomsSuccess(products));
        yield put(getTotalHotelRoomsSuccess(products.length));
    } catch (err) {
        yield put(getHotelRoomsError(err));
    }
}

function* getProductByKeyword({ keyword }) {
    try {
        const searchParams = {
            title_contains: keyword,
        };
        const result = yield call(ProductRepository.getRecords, searchParams);
        yield put(getHotelRoomByKeywordsSuccess(result));
    } catch (err) {
        yield put(getHotelRoomsError(err));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_PRODUCTS, getHotelRooms)]);
    yield all([
        takeEvery(actionTypes.GET_TOTAL_OF_PRODUCTS, getTotalOfProducts),
    ]);
    yield all([takeEvery(actionTypes.GET_BRANDS, getBrands)]);
    yield all([
        takeEvery(actionTypes.GET_PRODUCT_CATEGORIES, getHotelRoomCategories),
    ]);
    yield all([
        takeEvery(actionTypes.GET_PRODUCTS_BY_CATEGORY, getProductByCategory),
    ]);
    yield all([
        takeEvery(
            actionTypes.GET_PRODUCTS_BY_PRICE_RANGE,
            getProductByPriceRange
        ),
    ]);
    yield all([
        takeEvery(actionTypes.GET_PRODUCTS_BY_BRAND, getProductByBrand),
    ]);
    yield all([
        takeEvery(actionTypes.GET_PRODUCTS_BY_KEYWORD, getProductByKeyword),
    ]);
    yield all([takeEvery(actionTypes.GET_PRODUCT_BY_ID, getProductById)]);
}
