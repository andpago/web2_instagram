import {createStore, applyMiddleware} from 'redux';
import {initReducers} from '../reducers';
import middleware from '../middleware';
import { composeWithDevTools } from 'redux-devtools-extension';


export function initStore(additionalMiddleware=[]) {
    const initialStore = {};
    return createStore(initReducers,
                       initialStore,
                       composeWithDevTools(applyMiddleware(...additionalMiddleware, ...middleware))
    );
}