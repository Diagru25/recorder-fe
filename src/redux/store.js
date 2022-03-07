import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createBrowserHistory } from 'history';
import { routerReducer } from 'react-router-redux';
import createSagaMiddleware from '@redux-saga/core';
import reducers from './reducers';
import rootSaga from './sagas';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
//const middleware = [sagaMiddleware];

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer,
    }),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

export { store, history }
