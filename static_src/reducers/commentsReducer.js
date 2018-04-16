import update from 'react-addons-update';
import { SET_DATA, SET_BANNER } from '../actions/likeCommentActions';
import { SCROLL_ACTION } from '../actions/scroll';

const initialState = {
    commentsBar: {
        bannerShown: true,
        data: [],
    },
};

export function commentsBarReducer(store = initialState, action) {
    switch (action.type) {
        case SCROLL_ACTION: {
            return update(store, {
                commentsBar: {
                    bannerShown: { $set: true },
                    data: { $set: [] },
                },
            });
        }
        case SET_DATA: {
            return update(store, {
                commentsBar: {
                    bannerShown: { $set: false },
                    data: { $set: action.data },
                },
            });
        }
        default:
            return store;
    }
}
