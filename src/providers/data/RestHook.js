/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hook calling fething function
# This hook is the only way to enable jest to mock the
# calls to firebase third party libraries by mocking the
# hook .
# -------------------------------------------------------
# Nadège LEMPERIERE, @12 june 2023
# Latest revision: 12 june 2023
# ---------------------------------------------------- */

export const useFetch = () => { return fetch; };/* eslint-disable-line import/prefer-default-export */
