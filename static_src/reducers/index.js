import { combineReducers } from 'redux';
import { loadingReducer } from './loadingReducer';


export const initReducers = combineReducers({
    loadingReducer,
});