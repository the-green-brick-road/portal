/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Authentication provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @18 may 2023
# Latest revision: 22 may 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */

export function setIsAuthenticated(content) {
    return { type: types.SET_IS_AUTHENTICATED, payload: content };
}

export function setToken(content) {
    return { type: types.SET_TOKEN, payload: content };
}

export function setIsOpen(content) {
    return { type: types.SET_IS_OPEN, payload: content };
}

export function setError(content) {
    return { type: types.SET_ERROR, payload: content };
}


/* eslint-enable padded-blocks */
