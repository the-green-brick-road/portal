/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Authentication provider reducer
# -------------------------------------------------------
# Nadège LEMPERIERE, @17 june 2023
# Latest revision: 17 june 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable default-param-last */
export default function reducer(state = {}, action) {

    /* eslint-enable default-param-last */
    const { type, payload } = action;
    switch (type) {

    case types.SET_IS_AUTHENTICATED:
        return { ...state, isAuthenticated: payload };
    case types.SET_IS_OPEN:
        return { ...state, isOpen: payload };
    case types.SET_TOKEN:
        return { ...state, token: payload };
    case types.SET_MESSAGE:
        return { ...state, message: payload };
    case types.SET_USER:
        return { ...state, user: payload };
    case types.SET_REGISTRATION:
        return { ...state, registration: payload };
    case types.SET_SHALL_REFRESH:
        return { ...state, shallRefresh: payload };
    default: return state;

    }

}