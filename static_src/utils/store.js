import {createStore, applyMiddleware, compose} from 'redux';
import {initReducers} from '../reducers';
import middleware from '../middleware';

export function initStore(additionalMiddleware=[]) {
    const initialStore = {};
    return createStore(initReducers,
                       initialStore,
                       compose(applyMiddleware(...additionalMiddleware, ...middleware))
    );
}