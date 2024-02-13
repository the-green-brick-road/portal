/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Authentication provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @17 june 2023
# Latest revision: 17 june 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */

export function setIsAuthenticated(content) {
    return { type: types.SET_IS_AUTHENTICATED, payload: content };
}
export function setShallRefresh(content) {
    return { type: types.SET_SHALL_REFRESH, payload: content };
}

export function setToken(content) {
    return { type: types.SET_TOKEN, payload: content };
}

export function setIsOpen(content) {
    return { type: types.SET_IS_OPEN, payload: content };
}

export function setMessage(content) {
    return { type: types.SET_MESSAGE, payload: content };
}

export function setUser(content) {
    return { type: types.SET_USER, payload: content };
}

export function setRegistration(content) {
    return { type: types.SET_REGISTRATION, payload: content };
}

/* eslint-enable padded-blocks */