import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { toggleReducer } from './ToggleReducers';


export const initReducers = combineReducers({
    toggleReducer,
    routerReducer,
});
