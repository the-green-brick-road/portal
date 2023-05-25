/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Menu provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */

export function setIsItemSelected(content) {
    return { type: types.SET_IS_ITEM_SELECTED, payload: content };
}

export function setIsMenuOpen(content) {
    return { type: types.SET_IS_MENU_OPEN, payload: content };
}

export function setIcons(content) {
    return { type: types.SET_ICONS, payload: content };
}

/* eslint-enable padded-blocks */
