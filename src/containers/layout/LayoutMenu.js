/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Layout menu definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Fragment, Profiler }                         from 'react';

/* Material UI includes */
import { Toolbar, AppBar }                            from '@mui/material';
import { useTheme }                                   from '@mui/material/styles';

/* Portal includes */
import { NavigationBar, HamburgerMenu, HamburgerBar } from '../../components';
import { useDesign, useMenu, useLogging }             from '../../providers';

function LayoutMenu(props) {

    /* --------- Gather inputs --------- */
    const { top = '95px', left = '20px', height = '20px', width = '100%', item = '40px', isDark=false } = props || {};
    const { screen, isSliding, hasAcceptedCookies }  = useDesign();
    const { isMenuOpen }         = useMenu();
    const { onRender }           = useLogging();
    const theme                  = useTheme();
    const componentName = 'LayoutMenu';

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <AppBar elevation={isSliding ? 4 : 0} style={{ position:'absolute', height:height, display:'flex', width:width, top:top, left:left, backgroundColor: isSliding ? theme.palette.primary.main : 'rgba(255,255,255,0)', visibility: ( hasAcceptedCookies? 'visible' : 'hidden' )}}>
                <Toolbar variant="dense" style={{ height: '100%', width: '100%', paddingLeft: '0px', paddingRight:'20px' }}>
                    {(screen === 'large') && (<NavigationBar height={height} isNegative={isSliding} theme={theme} isDark={isDark}/>)}
                    {(screen !== 'large') && (
                        <Fragment>
                            <HamburgerBar height={height} isNegative={isSliding} theme={theme} isDark={isDark}/>
                            {(isMenuOpen) && (<HamburgerMenu isDark={isDark} margin={left} top={height} itemHeight={item} isNegative={isSliding} theme={theme}/>)}
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </Profiler>
    );

}

export default LayoutMenu;
