/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hook calling firebase functions.
# This hook is the only way to enable jest to mock the
# calls to firebase third party libraries by mocking the
# hook .
# -------------------------------------------------------
# Nadège LEMPERIERE, @08 may 2023
# Latest revision: 08 may 2023
# ---------------------------------------------------- */

import { initializeApp, getApps }                                   from 'firebase/app';
import { isSupported, getAnalytics, setAnalyticsCollectionEnabled } from 'firebase/analytics';
import { getPerformance }                                           from "firebase/performance";

export const useInitializeApp = () => { return initializeApp; };
export const useGetApps = () => { return getApps; };
export const useIsSupported = () => { return isSupported; };
export const useGetAnalytics = () => { return getAnalytics; };
export const useGetPerformance = () => { return getPerformance; };
export const useSetAnalyticsCollectionEnabled = () => { return setAnalyticsCollectionEnabled; };
