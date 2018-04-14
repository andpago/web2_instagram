import { combineReducers } from 'redux';
import { loadingReducer } from './loadingReducer';
import {feedReducer} from "./feedReducer";


export const initReducers = combineReducers({
    loadingReducer,
    feedReducer
});