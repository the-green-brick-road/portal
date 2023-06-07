/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Footer avatar
# -------------------------------------------------------
# Nadège LEMPERIERE, @26 may 2023
# Latest revision: 28 may 2023
# ---------------------------------------------------- */
/* Material UI includes */
import { Avatar } from '@mui/material';
import { styled } from '@mui/system';

const FooterAvatar = styled(Avatar)(({ col }) => ({

    backgroundColor: col,
    width:  '22px',
    height: '22px',
    '&:hover': {
        width:  '24px',
        height: '24px',
        transition: 'border-bottom-style 2s',
    },
    '&:hover span': { visibility: 'visible' },
    a: { fontSize: '14px' },
}));

export default FooterAvatar;