/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Layout frame definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */


/* Material UI includes */
import { Container }    from '@mui/material';

function LayoutFrame(props) {

    /* ----------- Define HTML --------- */
    return (
        <Container style={{ width: '100vw', height: '100vh', maxWidth:'3000px', backgroundColor: 'black', zIndex: -1, position: 'absolute', padding:0}}/>
    );

}


export default LayoutFrame;
