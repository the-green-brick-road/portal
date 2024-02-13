/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Login speed-dial component
# -------------------------------------------------------
# Nadège LEMPERIERE, @16 june 2023
# Latest revision: 16 june 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Button  } from '@mui/material';
import { styled }                     from '@mui/system';

const LoginButton = styled(Button)(({ margin }) => ({
    borderRadius: '2px',
    justifyContent: 'flex-start',
    marginLeft:margin,
    marginRight:margin,
    marginTop:'16px',
    paddingLeft:'16px',
    paddingRight:'16px',
    paddingTop:'8px',
    paddingBottom:'8px',
    fontFamily:'Roboto',
    fontWeight:500,
    fontSize: '14px',
    textTransform:'capitalize',
    maxWidth: '360px',
    color:'white',
    height:'40px',
    textAlign:'center',
    '.MuiButton-startIcon': {
        marginRight: '16px',
        marginLeft:'0px',
    },
}));


export default LoginButton;
