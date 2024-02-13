/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Design provider reducer
# -------------------------------------------------------
# Nadège LEMPERIERE, @15 may 2023
# Latest revision: 15 may 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable default-param-last */
export default function reducer(state = {}, action) {

    /* eslint-enable default-param-last */
    const { type, payload } = action;
    switch (type) {

    case types.SET_IS_WEBP_SUPPORTED:
        return { ...state, isWebpSupported: payload };
    case types.SET_IS_SLIDING:
        return { ...state, isSliding: payload };
    case types.SET_IMAGES:
        return { ...state, images: payload };
    case types.SET_HAS_ACCEPTED_COOKIES:
        return { ...state, hasAcceptedCookies: payload };
    default:
        return state;

    }

}
