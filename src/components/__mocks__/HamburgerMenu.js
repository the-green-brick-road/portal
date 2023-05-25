/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# HamburgerMenu component mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Box, Typography }   from '@mui/material';

function HamburgerMenu(props) {

    /* --------- Gather inputs --------- */
    const { top , margin, isNegative, theme={} } = props;
    /* const componentName = 'HamburgerBar'; */

    /* -------- Defining theme --------- */
    let color = theme.palette.primary.main;
    if (isNegative) { color = theme.palette.common.white; }
    const menuWidthString = `calc( 100vw - 2 * ${margin})`;

    return (
        <Box style={{ minHeight:'30px', width:menuWidthString, top:top, zIndex:1000, position:'absolute', backgroundColor:color }} >
            <Typography> HamburgerMenu </Typography>
        </Box>
    );

}

export default HamburgerMenu;