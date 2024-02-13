/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Cookie component
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 june 2023
# Latest revision: 23 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }                            from 'react';

/* Material UI includes */
import { Button, Typography, Link, Paper }     from '@mui/material';

/* Website includes */
import { useLogging, useAnalytics, useDesign } from '../../providers';

function Cookies(props) {

    /* --------- Gather inputs --------- */
    const { color }                 = props;
    const { deactivatePerformance, activatePerformance, deactivateAnalytics, activateAnalytics  } = useAnalytics();
    const { logText, onRender }     = useLogging();
    const { setHasAcceptedCookies } = useDesign();
    const componentName             = 'Cookies';

    /* ------ Manage cookie change ----- */
    const activateCookies = () => {

        logText(componentName, 'debug', 'workflow', ' activateCookies');
        setHasAcceptedCookies(true);
        activateAnalytics();
        activatePerformance();

    };
    const deactivateCookies = () => {

        logText(componentName, 'debug', 'workflow', ' deactivateCookies');
        setHasAcceptedCookies(false);
        deactivateAnalytics();
        deactivatePerformance();

    };

    /* ----------- Define HTML --------- */
    return (

        <Profiler id={componentName} onRender={onRender}>
            <Paper id="cookies" square={true} style={{ backgroundColor:color, position:'relative', paddingLeft:10, paddingRight:10, paddingBottom:10, paddingTop:10, bottom:0 }}>
                <Typography style= {{ color:'#ffffff' }}>
                    We use cookies to enable the proper functioning and security of our websites, and help us offer you the best possible user experience. By clicking Accept, you consent to the use of these cookies for advertising and analytics. You can change your cookie settings at any time. For more information, please read our
                    <Link href="/policy" style= {{ color:'#ffffff' }}>
                        cookie policy
                    </Link>
                </Typography>
                <Button aria-label='accept' onClick={activateCookies} style={{ backgroundColor: '#ffffff', margin:'10px' }} >
                    <Typography style={{ color: color, fontWeight:'bold' }}>
                        Accept
                    </Typography>
                </Button>
                <Button aria-label='decline' onClick={deactivateCookies} style={{ backgroundColor: '#ffffff', margin:'10px' }} >
                    <Typography style={{ color: color, fontWeight:'bold' }}>
                        Decline
                    </Typography>
                </Button>
            </Paper>
        </Profiler>
    );

}

export default Cookies;
