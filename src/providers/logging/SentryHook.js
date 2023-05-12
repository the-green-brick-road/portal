/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hook calling sentry functions.
# This hook is the only way to enable jest to mock the
# calls to sentry third party libraries by mocking the
# hook .
# -------------------------------------------------------
# Nadège LEMPERIERE, @08 may 2023
# Latest revision: 08 may 2023
# ---------------------------------------------------- */


import { init, captureMessage, setTag } from "@sentry/react";

export const useInit = ()           => { return init; };
export const useSetTag = ()         => { return setTag; };
export const useCaptureMessage = () => { return captureMessage; };
