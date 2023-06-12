/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Navigation Button styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const NavigationButton = styled(Button)(({ col }) => ({

    color:col,
    verticalAlign: 'middle',
    borderRadius: '0',
    paddingTop: '6.5px',
    paddingLeft: '6px',
    paddingRight: '6px',
    textTransform: 'capitalize',
    span: { visibility: 'hidden' },
    '&:hover': {
        borderTopStyle: 'none',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderWidth: '3px',
        transition: 'border-bottom-style 2s',
    },
    '&:hover span': { visibility: 'visible' },
}));

export default NavigationButton;
