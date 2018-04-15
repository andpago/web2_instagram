import update from 'react-addons-update';
import { SET_POST_CREATION_FORM_IMAGE, SET_POST_CREATION_FORM_TEXT } from '../actions/postCreationFormActions';

const initialState = {
    image: null,
    text: '',
};

export function postCreationFormReducer(store = initialState, action) {
    switch (action.type) {
        case SET_POST_CREATION_FORM_IMAGE:
            return update(store, {
                image: action.image,
            });
        case SET_POST_CREATION_FORM_TEXT:
            return update(store, {
                text: action.text,
            });
        default:
            return store;
    }
}
