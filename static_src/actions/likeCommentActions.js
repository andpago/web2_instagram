export const SET_DATA = 'SET_DATA';
export const SET_BANNER = 'SET_BANNER';

export const setData = data => ({
    type: SET_DATA,
    data: data,
});


export const setBanner = () => ({
    type: SET_BANNER,
});
