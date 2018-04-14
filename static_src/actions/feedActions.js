export const FETCH_DATA = 'FETCH_DATA';

export function fetchData(data) {
    return {
        type: FETCH_DATA,
        data: data,
    };
}
