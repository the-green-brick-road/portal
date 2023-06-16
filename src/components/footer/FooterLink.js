/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Footer link with hover
# -------------------------------------------------------
# Nadège LEMPERIERE, @26 may 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Link }   from '@mui/material';
import { styled } from '@mui/system';

const FooterLink = styled(Link)(({ col }) => ({

    backgroundColor: col,
    borderRadius: '100%',
    display: 'flex',
    width:  '22px',
    height: '22px',
    justifyContent:'center',
    alignItems:'center',
    '&:hover': {
        width:  '24px',
        height: '24px',
        transition: 'border-bottom-style 2s',
    },
    '&:hover span': { visibility: 'visible' },
    a: { fontSize: '14px' },
}));

export default FooterLink;