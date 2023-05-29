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

/* Material UI includes */
import { Container }              from '@mui/material';

/* Portal includes */
import { Footer }                 from '../../components';

function LayoutFooter(props) {

    /* --------- Gather inputs --------- */
    const { left, width  } = props || {};
    /*const componentName    = 'LayoutFooter';*/

    /* ----------- Define HTML --------- */
    return (
        <Container
            id="footer"
            data-testid='layout-page-container'
            style={{
                width: width,
                position: 'absolute',
                bottom:0,
                padding:0,
                left:left,
                marginBottom: 0,
                zIndex: '1',
                boxShadow: 0,
                'div > MuiPaper-elevation1' : { padding:0 },
            }}
        >
            <Footer/>
        </Container>
    );


}

export default LayoutFooter;
