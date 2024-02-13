/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Image component mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Box, Typography }             from '@mui/material';

function Cookies(props) {

    /* --------- Gather inputs --------- */
    const { color } = props;

    /* -------- Defining theme --------- */
    return (
        <Box style={{ minHeight:'30px',zIndex:1000, position:'absolute', backgroundColor:color }} >
            <Typography> Cookies </Typography>
        </Box>
    );

}

export default Cookies;
