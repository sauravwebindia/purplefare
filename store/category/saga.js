/* import { call, put, takeLatest } from 'redux-saga/effects';
import {REQUEST_API_DATA , receiveApiData} from './action';
import {fetchData} from './api';

function* getApiData(action){
    try{

        const data = yield call(fetchData)
        yield put(receiveApiData(data))

    }catch(e){
      console.log(e)

    }

}


export default function* mySaga(){
    yield takeLatest(REQUEST_API_DATA, getApiData);
} */


/* 
import {call, put, takeLatest, all, cancel, cancelled, takeEvery,} from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {categoryRepository} from '../../repositories/Category';
//import CategoryRepository from '../../repositories/Category'

import {
    actionTypes,
    getProductCategoriesSuccess,
    cancelApiRequest

    
} from './action'

function* getHeaderMenuCategories() {
    try {
        const response = yield call(categoryRepository);
        //const {data}  = response;
        //const res = yield fetch('https://jsonplaceholder.typicode.com/users')
         const data = yield response.json()
        yield put(getProductCategoriesSuccess(data));
    } catch (err) {
        console.log(err);
    }
    finally {
        if(yield cancelled())
        yield put(cancelApiRequest('Sync cancelled!'))
    }
}



export default function* rootSaga(){

    yield all ([takeLatest(actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS, getHeaderMenuCategories)]);
    yield all([takeEvery(actionTypes.CANCEL_API_REQUEST,cancelApiRequest )])  
    
}
 */






