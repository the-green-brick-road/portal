/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Layout standard container
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }              from 'react';
import { Outlet }                from "react-router-dom";

/* Material UI includes */
import { Container }             from '@mui/material';
import { useTheme }              from '@mui/material/styles';

/* Portal includes */
import { useDesign, useLogging } from '../../providers';

/* Local includes */
import LayoutPage                from './LayoutPage';
import LayoutContent             from './LayoutContent';
import LayoutMenu                from './LayoutMenu';
import LayoutFooter              from './LayoutFooter';
import LayoutCookies             from './LayoutCookies';

function Layout() {

    /* --------- Gather inputs --------- */
    const { sizes, isDarkMode, hasAcceptedCookies } = useDesign();
    const { onRender }                              = useLogging();
    const theme                                     = useTheme();
    const componentName = 'Layout';

    /* -------- Defining theme --------- */
    const background_color = theme.palette.common.white;
    const color            = theme.palette.primary.main;

    /* --------- Compute sizes --------- */
    const menu_height       = `${sizes['menu-height']}px`;
    const margin_width      = `max( ${sizes['margin']}px ,calc(100vw - ${sizes['large-width']}px )/2)`;
    const margin_height     = `${sizes['margin']}px`;
    const width             = `min(calc(100vw - 2 * ${sizes['margin']}px ), ${sizes['large-width']}px )`;
    const height            = `calc( 100vh - ${sizes['margin']}px )`;
    const content_height    = `calc( 100vh - ${sizes['margin']}px - ${menu_height} )`;
    const item              = `${sizes['hamburger-height']}px`

    /* -------- Render component ------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Container style={{ width: '100vw', height: '100vh', maxWidth:'3000px', backgroundColor: theme.palette.background.default, zIndex: -1, position: 'absolute', padding:0}}/>
            <LayoutMenu top={margin_height} height={menu_height} width={width} left={margin_width} item={item} isDark={isDarkMode}/>
            <LayoutContent top={menu_height} left={margin_width} height={content_height} width={width}/>
            <LayoutPage top={margin_height} left={margin_width} height={height} width={width} color={background_color}>
                <Container style={{padding:0, filter: (hasAcceptedCookies? 'none' : 'blur(4px)')}}>
                    <Outlet />
                    <LayoutFooter width={width} color={background_color} isDark={isDarkMode}/>
                </Container>
                <LayoutCookies width={width} left={0} color={color}/>
            </LayoutPage>
        </Profiler>
    );

}

export default Layout;
