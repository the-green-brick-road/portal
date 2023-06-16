/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Layout content frame definition (not to be visible !)
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }     from 'react';

/* Material UI includes */
import { Container }    from '@mui/material';

/* Portal includes */
import { useLogging }   from '../../providers';

function LayoutContent(props) {

    /* --------- Gather inputs --------- */
    const { top, left, height, width } = props || {};
    const { onRender }                 = useLogging();
    const componentName  = "LayoutContent";

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Container>
                <Container
                    id="content"
                    style={{
                        width,
                        height,
                        position: 'fixed',
                        backgroundColor: 'rgba(255,255,255,0)',
                        top: top,
                        left: left,
                        flexDirection: 'row',
                        overflow: 'hidden',
                        zIndex: '-1',
                    }}
                />
            </Container>
        </Profiler>
    );

}

export default LayoutContent;
