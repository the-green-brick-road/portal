/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Layout footer definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @28 may 2023
# Latest revision: 28 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }               from 'react';

/* Material UI includes */
import { Container }              from '@mui/material';

/* Portal includes */
import { Cookies }                from '../../components';
import { useLogging, useDesign }  from '../../providers';

function LayoutCookies(props) {

    /* --------- Gather inputs --------- */
    const { width, left, color } = props || {};
    const { onRender }           = useLogging();
    const { hasAcceptedCookies } = useDesign();
    const componentName          = 'LayoutCookies';

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Container
                id="layout-cookies"
                data-testid='layout-cookies-container'
                style={{
                    width: width,
                    backgroundColor: color,
                    position: 'absolute',
                    bottom:0,
                    padding:0,
                    left: left,
                    marginBottom: 0,
                    boxShadow: 0,
                    height: ( hasAcceptedCookies? '0px' : 'auto' ),
                    visibility: ( hasAcceptedCookies? 'hidden' : 'visible' ),
                }}
            >
                <Cookies color={color}/>
            </Container>
        </Profiler>
    );

}

export default LayoutCookies;
