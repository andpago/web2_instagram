export const TOGGLE_ON = 'TOGGLE_ON';
export const TOGGLE_OFF = 'TOGGLE_OFF';

export function toggleOn() {
    return {
        type: TOGGLE_ON,
    };
}

export function toggleOff() {
    return {
        type: TOGGLE_OFF,
    };
}

