import update from 'react-addons-update';
import {FETCH_DATA, fetchData} from "../actions/feedActions";

const initialState = {
    feed: {
        data: [],
    }
};

export function feedReducer(store=initialState, action) {
    switch (action.type) {
        case FETCH_DATA: {
            return update(store, {
                feed: {
                    data: {$set: action.data},
                }
            });
        }
        default:
            return store;
    }
}