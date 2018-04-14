import update from 'react-addons-update';
import { START_LOADING, STOP_LOADING } from '../actions/loadingActions';

const initialState = {
    commentsBar: {
        isLoading: false,
        text: 'unknown',
    },
};

export function loadingReducer(store=initialState, action) {
    switch (action.type) {
        case START_LOADING: {
            return update(store, {
                commentsBar: {
                    isLoading: { $set: true },
                    text: { $set: 'loading' },
                },
            });
        }
        case STOP_LOADING: {
            return update(store, {
                commentsBar: {
                    isLoading: { $set: false },
                    text: { $set: 'not loading' },
                },
            });
        }
        default:
            return store;
    }
}
