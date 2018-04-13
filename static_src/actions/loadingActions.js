export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

export const startLoading = () => {
    console.log('startloading action created');
    return {
        type: START_LOADING,
    }
};

export const stopLoading = () => {
    console.log('stoploading action created');
    return {
        type: STOP_LOADING,
    }
};