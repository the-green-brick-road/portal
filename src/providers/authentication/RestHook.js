/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hook calling fetching function
# This hook is the only way to enable jest to mock the
# calls to firebase third party libraries by mocking the
# hook .
# -------------------------------------------------------
# Nadège LEMPERIERE, @16 june 2023
# Latest revision: 16 june 2023
# ---------------------------------------------------- */

export const useFetch = () => { return fetch; };/* eslint-disable-line import/prefer-default-export */
