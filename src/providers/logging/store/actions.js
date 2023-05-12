/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Logging provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @08 may 2023
# Latest revision: 08 may 2023
# ---------------------------------------------------- */

/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */

export function setIsLoggingActivated(content) { /* eslint-disable-line import/prefer-default-export */
    return { type: types.SET_IS_LOGGING_ACTIVATED, payload: content };
}

/* eslint-enable padded-blocks */
