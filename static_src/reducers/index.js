import { combineReducers } from 'redux';
import { commentsReducer } from './commentsReducer';
import { feedReducer } from './feedReducer';
import { postCreationFormReducer } from './postCreationFormReducer';


export const initReducers = combineReducers({
    commentsReducer,
    feedReducer,
    postCreationFormReducer,
});
