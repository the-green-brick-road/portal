/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Navigation Bar component
# -------------------------------------------------------
# Nadège LEMPERIERE, @18 may 2023
# Latest revision: 22 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Toolbar, IconButton, AppBar, Stack }       from '@mui/material';
import { useTheme }                                 from '@mui/material/styles';
import { AccountCircle, Login }                     from '@mui/icons-material';

/* Portal includes */
import { useDesign, useLogging, useAuthentication } from '../../providers';

function NavigationBar(props) {

    /* --------- Gather inputs --------- */
    const { logText }                                    = useLogging();
    const { isSliding, sizes }                           = useDesign();
    const { isAuthenticated, setIsOpen, isOpen }         = useAuthentication();
    const componentName = 'NavigationBar';

    /* -------- Defining theme --------- */
    let menuColor = 'transparent'
    if (isSliding) { menuColor = 'primary'; }

    let contentColor = 'primary';
    if (isSliding) { contentColor = 'white'; }

    /* ---- Defining events handler ---- */
    const handleClick = (event) => { setIsOpen(!isOpen) }

    /* ----------- Define HTML --------- */
    return (
        <AppBar color={menuColor} position="static" enableColorOnDark sx={{height:sizes['menu-height']}}>
            <Toolbar sx={{height:sizes['menu-height']}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{height:sizes['menu-height']}}>
                    <IconButton onClick={handleClick}>
                        {(isAuthenticated) && (<AccountCircle color={contentColor} sx={{width:'32px', height:'32px'}}/>)}
                        {(!isAuthenticated) && (<Login color={contentColor} sx={{width:'32px', height:'32px'}}/>)}
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );

}

export default NavigationBar;
