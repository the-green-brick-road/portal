/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Data provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 09 june 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */

export function setPosts(content) {
    return { type: types.SET_POSTS, payload: content };
}

export function setSeasons(content) {
    return { type: types.SET_SEASONS, payload: content };
}

export function setRobots(content) {
    return { type: types.SET_ROBOTS, payload: content };
}

export function setTeam(content) {
    return { type: types.SET_TEAM, payload: content };
}

export function setCalendars(content) {
    return { type: types.SET_CALENDARS, payload: content };
}

/* eslint-enable padded-blocks */
