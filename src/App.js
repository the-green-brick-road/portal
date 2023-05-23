/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# React application definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @03 may 2023
# Latest revision: 19 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Container }                                                                    from '@mui/material';

/* Website includes */
import Config                                                                           from './config';
import { ErrorBoundary }                                                                from './containers';
import { AnalyticsProvider, LoggingProvider, DesignProvider, AuthenticationProvider }   from './providers';
import { ConfigurationProvider }                                                        from './providers';
import { NavigationBar, Login }                                                         from './components';

function App() {

    /* --------- Gather inputs --------- */
    /* const componentName = 'App'; */

    /* -------- Render component ------- */
    return (
        <Container style={{width:'100vw', height:'100vh', maxWidth:'3000px',margin:0, padding:0}} >
            <ConfigurationProvider config={Config}>
                <LoggingProvider>
                    <ErrorBoundary>
                        <AuthenticationProvider>
                            <AnalyticsProvider>
                                <DesignProvider>
                                    <NavigationBar/>
                                    <Login/>
                                    Building in progress...
                                </DesignProvider>
                            </AnalyticsProvider>
                        </AuthenticationProvider>
                    </ErrorBoundary>
                </LoggingProvider>
            </ConfigurationProvider>
        </Container>
    );

}

export default App;
