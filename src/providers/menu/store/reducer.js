/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Menu provider reducer
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable default-param-last */
export default function reducer(state = {}, action) {

    /* eslint-enable default-param-last */
    const { type, payload } = action;
    switch (type) {

    case types.SET_IS_ITEM_SELECTED:
        return { ...state, isItemSelected: payload };
    case types.SET_IS_MENU_OPEN:
        return { ...state, isMenuOpen: payload };
    default:
        return state;

    }

}
