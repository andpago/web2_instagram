import update from 'react-addons-update';
import { TOGGLE_ON, TOGGLE_OFF } from '../actions/ToggleActions';

const initialState = {
    on: false,
};

export function toggleReducer(store = initialState, action) {
    switch (action.type) {
        case TOGGLE_ON: {
            return update(store, {
                on: { $set: true },
            });
        }
        case TOGGLE_OFF: {
            return update(store, {
                on: { $set: false },
            });
        }
        default:
            return store;
    }
}
