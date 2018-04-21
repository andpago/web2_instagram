import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initReducers } from '../reducers/index';
import middleware from '../middleware/index';


export function initStore(additionalMiddleware = []) {
    const initialStore = {};
    return createStore(
        initReducers,
        initialStore,
        composeWithDevTools(applyMiddleware(...additionalMiddleware, ...middleware)),
    );
}
