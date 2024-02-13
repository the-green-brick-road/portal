/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2024] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Analytics provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @13 february 2024
# Latest revision: 13 february 2024
# ---------------------------------------------------- */

/* React includes */
import { createContext } from 'react';

const context = createContext(null);

/* ----- Define provider values ---- */
var state = {
    isAnalyticsActivated :   false,
    isPerformanceActivated : false,
    activatePerformance:     jest.fn(() => { state.isPerformanceActivated = true }),
    deactivatePerformance:   jest.fn(() => { state.isPerformanceActivated = false }),
    activateAnalytics:       jest.fn(() => { state.isAnalyticsActivated = true }),
    deactivateAnalytics:     jest.fn(() => { state.isAnalyticsActivated = false }),
};


function AnalyticsProvider(props) {

    const { children, isAnalyticsActivated = false, isPerformanceActivated = false } = props;

    state.isAnalyticsActivated      = isAnalyticsActivated
    state.isPerformanceActivated    = isPerformanceActivated

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );

}

function useAnalytics() { return state; }

export { useAnalytics, AnalyticsProvider };