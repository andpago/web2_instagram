import update from 'react-addons-update';
import { SET_DATA, SET_BANNER } from '../actions/commentActions';

const initialState = {
    commentsBar: {
        bannerShown: true,
        data: [],
    },
};

export function commentsReducer(store = initialState, action) {
    switch (action.type) {
        case SET_BANNER: {
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
