/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Analytics provider reducer
# -------------------------------------------------------
# Nadège LEMPERIERE, @04 may 2023
# Latest revision: 04 may 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable default-param-last */
export default function reducer(state = {}, action) {

    /* eslint-enable default-param-last */
    const { type, payload } = action;
    switch (type) {

    case types.SET_IS_ANALYTICS_ACTIVATED:
        return { ...state, isAnalyticsActivated: payload };
    case types.SET_IS_PERFORMANCE_ACTIVATED:
        return { ...state, isPerformanceActivated: payload };
    default:
        return state;

    }

}
