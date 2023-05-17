/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hook calling material ui functions.
# This hook is the only way to enable jest to mock the
# calls to material third party libraries by mocking the
# hook .
# -------------------------------------------------------
# Nadège LEMPERIERE, @15 may 2023
# Latest revision: 16 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { useMediaQuery }       from '@mui/material';

export const useUseMediaQuery = () => { return useMediaQuery; }; /* eslint-disable-line import/prefer-default-export */
