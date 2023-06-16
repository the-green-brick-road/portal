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
import { Footer }                 from '../../components';
import { useLogging }             from '../../providers';

function LayoutFooter(props) {

    /* --------- Gather inputs --------- */
    const { width, color, isDark } = props || {};
    const { onRender }             = useLogging();
    const componentName    = 'LayoutFooter';

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Container
                id="layout-footer"
                data-testid='layout-page-container'
                style={{
                    width: width,
                    backgroundColor: color,
                    position: 'relative',
                    bottom:0,
                    padding:0,
                    left:0,
                    marginBottom: 0,
                    boxShadow: 0,
                }}
            >
                <Footer color={color} isDark={isDark}/>
            </Container>
        </Profiler>
    );


}

export default LayoutFooter;
