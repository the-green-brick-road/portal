/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hamburger Stack component
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Stack }  from '@mui/material';
import { styled } from '@mui/system';

const HamburgerStack = styled(Stack)(({ color = '#ffffff', padding = '10px', height = '100%' }) => ({
    borderColor: color,
    borderWidth: '0px',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderRadius: '0px',
    color,
    paddingRight: padding,
    paddingLeft: padding,
    paddingTop: 0,
    paddingBottom: 0,
    height,
    right: '0px',
    width: '100%',
    verticalAlign: 'middle',
    position: 'relative',
}));

export default HamburgerStack;
