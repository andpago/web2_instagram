import { combineReducers } from 'redux';
import { commentsBarReducer } from './commentsReducer';
import { feedReducer } from './feedReducer';
import { postCreationFormReducer } from './postCreationFormReducer';


export const initReducers = combineReducers({
    commentsReducer: commentsBarReducer,
    feedReducer,
    postCreationFormReducer,
});
