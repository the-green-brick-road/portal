/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Data provider reducer
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable default-param-last */
export default function reducer(state = {}, action) {

    /* eslint-enable default-param-last */
    const { type, payload } = action;
    switch (type) {

    case types.SET_POSTS:
        return { ...state, posts: payload };
    case types.SET_SEASONS:
        return { ...state, seasons: payload };
    default:
        return state;

    }

}
