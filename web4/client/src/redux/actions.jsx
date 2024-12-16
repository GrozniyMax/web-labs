import * as actions from './actionTypes.jsx'

export const setState = payload => ({
    type: actions.SET_STATE,
    payload: payload
});

export const click = payload => ({
    type: actions.CLICK,
    payload: payload
});

export const addPoint = payload => ({
    type: actions.ADD_POINT,
    payload: payload
});

export const setR = payload => ({
    type: actions.SET_R,
    payload: payload
});


