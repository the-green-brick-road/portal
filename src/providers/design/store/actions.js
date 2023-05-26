/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Design provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @15 may 2023
# Latest revision: 15 may 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */

export function setIsSliding(content) {
    return { type: types.SET_IS_SLIDING, payload: content };
}

export function setIsWebpSupported(content) {
    return { type: types.SET_IS_WEBP_SUPPORTED, payload: content };
}

export function setImages(content) {
    return { type: types.SET_IMAGES, payload: content };
}


/* eslint-enable padded-blocks */
