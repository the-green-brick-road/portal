/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hamburger Bar component
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }              from 'react';

/* Portal includes */
import { useLogging }            from '../../providers';
// import { Login }                 from '../../components';

/* Local includes */
import HamburgerLogo             from './HamburgerLogo';
import HamburgerStack            from './HamburgerStack';
import HamburgerIcon             from './HamburgerIcon';

function HamburgerBar(props) {

    /* --------- Gather inputs --------- */
    const { height = '20px', isNegative = false, isDark = false, theme={palette:{common:{white:'#ffffff'},primary:{main:'#000000'},secondary:{main:'#ffffff'}}} }  = props
    const { onRender }      = useLogging();
    const componentName = 'HamburgerBar';

    /* -------- Defining theme --------- */

    let stackcolor = theme.palette.primary.main;
    if (isNegative) { stackcolor = theme.palette.common.white; }
    if (isDark && isNegative) { stackcolor = theme.palette.common.black; }

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <HamburgerStack placeholder="hamburgerbar" id="hamburgerbar" direction="row" alignItems="center" justifyContent="space-between" color={stackcolor} padding="20px" height={height}>
                <HamburgerLogo padding="20px" height={height} name='logo' />
                <HamburgerIcon width="30px" height="30px" color={stackcolor} />
                <div></div>
            </HamburgerStack>
        </Profiler>
    );

}

export default HamburgerBar;
