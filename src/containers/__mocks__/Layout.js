/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Layout container mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Fragment }   from 'react';
import { Outlet }     from "react-router-dom";

/* Material UI includes */
import { Typography } from '@mui/material';

function Layout(props) {

    const { children } = props

    return (

        <Fragment>
            <Typography> Mock Layout </Typography>
            {children}
            <Outlet />
        </Fragment>

    );

}

export default Layout;
