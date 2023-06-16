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
import { Container }                                            from '@mui/material';

/* Google fonts includes */
import '@fontsource/play'

/* Portal includes */
import Config                                                   from './config';
import { ErrorBoundary, Router }                                from './containers';
import { AnalyticsProvider, LoggingProvider, DesignProvider }   from './providers';
import { ConfigurationProvider, MenuProvider, PostsProvider }   from './providers';
import { CalendarsProvider, RobotsProvider, SeasonsProvider }   from './providers';
import { TeamProvider }                                         from './providers';

function App() {

    /* --------- Gather inputs --------- */
    /* const componentName = 'App'; */

    /* -------- Render component ------- */
    return (
        <Container style={{width:'100vw', height:'100vh', maxWidth:'3000px',margin:0, padding:0, overflowY: 'hidden'}} >
            <ConfigurationProvider config={Config}>
                <LoggingProvider>
                    <ErrorBoundary>
                        <CalendarsProvider>
                            <RobotsProvider>
                                <SeasonsProvider>
                                    <PostsProvider>
                                        <TeamProvider>
                                            <AnalyticsProvider>
                                                <DesignProvider>
                                                    <MenuProvider>
                                                        <Router/>
                                                    </MenuProvider>
                                                </DesignProvider>
                                            </AnalyticsProvider>
                                        </TeamProvider>
                                    </PostsProvider>
                                </SeasonsProvider>
                            </RobotsProvider>
                        </CalendarsProvider>
                    </ErrorBoundary>
                </LoggingProvider>
            </ConfigurationProvider>
        </Container>
    );

}

export default App;
