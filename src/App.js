/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# React application definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @03 may 2023
# Latest revision: 08 may 2023
# ---------------------------------------------------- */

/* React includes */
import React from 'react';

/* Website includes */
import Config from './config';
import { AnalyticsProvider } from './providers';

function App() {

    /* --------- Gather inputs --------- */
    /* const componentName = 'App'; */

    /* -------- Render component ------- */
    return (
        <div>
            <AnalyticsProvider config={Config}>
                <p>Beta version</p>
            </AnalyticsProvider>
        </div>
    );

}

export default App;
