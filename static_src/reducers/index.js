import { combineReducers } from 'redux';
import { commentsReducer } from './commentsReducer';
import { feedReducer } from './feedReducer';


export const initReducers = combineReducers({
    commentsReducer,
    feedReducer,
});
