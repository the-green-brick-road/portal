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

/* Material UI includes */
import { Container }        from '@mui/material';

/* Website includes */
import Config                                   from './config';
import { ErrorBoundary }                        from './containers';
import { AnalyticsProvider, LoggingProvider }   from './providers';

function App() {

    /* --------- Gather inputs --------- */
    /* const componentName = 'App'; */

    /* -------- Render component ------- */
    return (
        <Container style={{width:'100vw', height:'100vh', margin:0, padding:0}} >
            <LoggingProvider config={Config}>
                <ErrorBoundary>
                    <AnalyticsProvider config={Config}>
                        First version
                    </AnalyticsProvider>
                </ErrorBoundary>
            </LoggingProvider>
        </Container>
    );

}

export default App;
