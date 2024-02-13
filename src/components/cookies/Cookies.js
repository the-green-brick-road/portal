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

/* Material UI includes */
import { Button, Typography, Link }            from '@mui/material';
import { useTheme }                            from '@mui/material/styles';

/* Website includes */
import { useLogging, useAnalytics, useDesign } from '../../providers';

function Cookies(props) {

    /* --------- Gather inputs --------- */
    const { isAnalyticsActivated, isPerformanceActivated, deactivatePerformance, activatePerformance, deactivateAnalytics, activateAnalytics  } = useAnalytics();
    const { logText, onRender } = useLogging();
    const { sizes, screen }     = useDesign();
    const theme = useTheme();
    const componentName = 'Cookies';

    /* --------- Compute sizes --------- */
    var margin = `max( ${sizes['margin']} ,calc((100vw - ${sizes['large-width']} )/2)`;
    if (screen !== 'large') { margin = 0; }

    /* ------ Manage cookie change ----- */
    const activateCookies = () => {

        logMessage(componentName, 'activateCookies --- BEGIN');
        activateAnalytics();
        activatePerformance();
        logMessage(componentName, 'activateCookies --- END');

    };
    const deactivateCookies = () => {

        logMessage(componentName, 'deactivateCookies --- BEGIN');
        deactivateAnalytics();
        deactivatePerformance();
        logMessage(componentName, 'deactivateCookies --- END');

    };

    /* ----------- Define HTML --------- */
    return (

        <Profiler id={componentName} onRender={onRender}>
            <div style={{ position:'fixed', backgroundColor: theme.palette.primary.main, bottom:'0px', left:margin, right:margin, zIndex:'10000', padding:'10px', height: ( hasChosen? '0px' : 'auto' ), visibility: ( hasChosen? 'hidden' : 'visible' ) }}>
                <Typography style= {{ color:'#ffffff' }}>
                    {intl.formatMessage({ id: 'cookies_consent', defaultMessage: ''})}
                    <Link href="/policy" style= {{ color:'#ffffff' }}>
                        {intl.formatMessage({ id: 'cookies_consent0', defaultMessage: ''})}
                    </Link>
                </Typography>
                <Button onClick={activateCookies} style={{ backgroundColor: '#ffffff', margin:'10px' }} >
                    <Typography style={{ color: theme.palette.primary.main, fontWeight:'bold' }}>
                        {intl.formatMessage({ id: 'cookies_consent_accept', defaultMessage: ''})}
                    </Typography>
                </Button>
                <Button onClick={deactivateCookies} style={{ backgroundColor: '#ffffff', margin:'10px' }} >
                    <Typography style={{ color: theme.palette.primary.main, fontWeight:'bold' }}>
                        {intl.formatMessage({ id: 'cookies_consent_reject', defaultMessage: ''})}
                    </Typography>
                </Button>
            </div>
        </Profiler>
    );

}

export default Cookies;
