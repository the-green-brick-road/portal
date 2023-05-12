/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hook calling console functions.
# This hook is the only way to enable jest to mock the
# calls to console third party libraries by mocking the
# hook .
# -------------------------------------------------------
# Nadège LEMPERIERE, @08 may 2023
# Latest revision: 08 may 2023
# ---------------------------------------------------- */

export const useLog = ()        => { return console.log; };
export const useError = ()      => { return console.error; };
export const useWarn = ()       => { return console.warn; };