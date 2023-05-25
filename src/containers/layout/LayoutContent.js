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

/* Material UI includes */
import { Container }    from '@mui/material';

function LayoutContent(props) {

    /* --------- Gather inputs --------- */
    const { top = '95px', left = '20px', height = '100vw', width = '100%' } = props || {};

    /* ----------- Define HTML --------- */
    return (
        <Container>
            <Container
                id="content"
                style={{
                    width,
                    height,
                    position: 'fixed',
                    backgroundColor: 'red',
                    top: top,
                    left: left,
                    flexDirection: 'row',
                    overflow: 'hidden',
                    zIndex: '-1',
                }}
            />
        </Container>
    );

}

export default LayoutContent;
