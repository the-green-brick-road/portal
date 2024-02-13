/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Layout page definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useEffect, useRef }      from 'react';

/* Material UI includes */
import { Container }              from '@mui/material';
import { useScrollTrigger }       from '@mui/material';

/* Portal includes */
import { useLogging, useDesign }  from '../../providers';

function LayoutPage(props) {

    /* --------- Gather inputs --------- */
    const { top = '0px', left = '0px', height = '100vh', width='100vw', color='white', children } = props || {};
    const { setIsSliding, hasAcceptedCookies }          = useDesign();
    const { logText }                                   = useLogging();
    const componentName                                 = 'LayoutPage';

    /* ----- Manage sliding event  ---- */
    const ref = useRef();
    const scrollTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: ref.current ? ref.current : window,
    });

    useEffect(() => {

        logText(componentName, 'debug', 'ux', ` useEffect[scrollTrigger] : ${scrollTrigger}`);
        setIsSliding(scrollTrigger)

    }, [scrollTrigger, logText]); /* eslint-disable-line react-hooks/exhaustive-deps */


    /* ----------- Define HTML --------- */
    return (
        <Container
            id="page"
            data-testid='layout-page-container'
            style={{
                width: width,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                height: height,
                backgroundColor: color,
                top: top,
                left: left,
                marginBottom: 0,
                marginTop: '0px',
                padding: 0,
                zIndex: '0',
            }}
        >
            <Container data-testid='layout-page-subcontainer' ref={ref} style={{ backgroundColor: color, position: 'absolute', overflowY: (hasAcceptedCookies? 'scroll' : 'hidden'), overflowX: 'hidden', width: width, height: height, top: 0, paddingLeft: 0, paddingRight: 0, zIndex: '1' }}>
                {children}
            </Container>
        </Container>
    );


}

export default LayoutPage;
