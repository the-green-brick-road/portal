/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Analytics provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @04 may 2023
# Latest revision: 04 may 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */

export function setIsAnalyticsActivated(content) {
    return { type: types.SET_IS_ANALYTICS_ACTIVATED, payload: content };
}

export function setIsPerformanceActivated(content) {
    return { type: types.SET_IS_PERFORMANCE_ACTIVATED, payload: content };
}

/* eslint-enable padded-blocks */
