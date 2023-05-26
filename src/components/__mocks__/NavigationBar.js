/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# NavigationBar component mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Box, Typography }   from '@mui/material';

function NavigationBar(props) {

    /* --------- Gather inputs --------- */
    const { height, isNegative, theme={} }  = props
    /* const componentName = 'HamburgerBar'; */

    /* -------- Defining theme --------- */
    let color = theme.palette.primary.main;
    if (isNegative) { color = theme.palette.common.white; }

    return (
        <Box style={{height:height, backgroundColor:color, width: '100%'}} >
            <Typography> NavigationBar </Typography>
        </Box>
    );

}

export default NavigationBar;