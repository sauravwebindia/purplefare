import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {thunk} from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const bindMiddleware = (middleware) => {
    /*if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }*/
    return applyMiddleware(...middleware);
};

const persistConfig = {
    key: 'purplefare',
    storage,
    whitelist: ['hotelBooking', 'compare', 'auth', 'wishlist','rooms'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    //console.log([thunk, sagaMiddleware]);

    const store = createStore(
        persistedReducer,
        initialState,
        bindMiddleware([thunk,sagaMiddleware])
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

const initialState = {}; // Ensure your reducers can handle this

export const store = configureStore(initialState);
export const persistor = persistStore(store);
