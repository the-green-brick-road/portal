/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Event divider customization
# -------------------------------------------------------
# Nadège LEMPERIERE, @12 june 2023
# Latest revision: 12 june 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Divider } from '@mui/material';
import { styled } from '@mui/system';


const EventsDivider = styled(Divider)(({col}) => ({
    color: col,
    '&::before': {
        borderWidth:'medium',
        borderColor:col,
    },
    '&::after': {
        borderWidth:'medium',
        borderColor:col,
    },
}));

export default EventsDivider;