import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares:any =
  process.env.NODE_ENV === 'production'
    ? [sagaMiddleware]
    : [sagaMiddleware, logger];

const persistConfig = {
  key: 'toyota@cat-griips',
  storage,
  whitelist: ['language', 'searchBar', 'auth', 'enumerators']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
