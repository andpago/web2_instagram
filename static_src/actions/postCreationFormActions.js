export const SET_POST_CREATION_FORM_IMAGE = 'SET_POST_CREATION_FORM_IMAGE';
export const SET_POST_CREATION_FORM_TEXT = 'SET_POST_CREATION_FORM_TEXT';

export const setPostCreationFormImage = image => ({
    type: SET_POST_CREATION_FORM_IMAGE,
    image: { $set: image },
});

export const setPostCreationFormText = text => ({
    type: SET_POST_CREATION_FORM_TEXT,
    text: { $set: text },
});

