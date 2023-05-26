/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hamburger Bar component
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Local includes */
import HamburgerLogo             from './HamburgerLogo';
import HamburgerStack            from './HamburgerStack';
import HamburgerIcon             from './HamburgerIcon';

function HamburgerBar(props) {

    /* --------- Gather inputs --------- */
    const { height = '20px', isNegative = false, theme={palette:{primary:{main:'#000000'},secondary:{main:'#ffffff'}}} }  = props
    /* const componentName = 'HamburgerBar'; */

    /* -------- Defining theme --------- */

    let stackcolor = theme.palette.primary.main;
    if (isNegative) { stackcolor = theme.palette.common.white; }

    /* ----------- Define HTML --------- */
    return (
        <HamburgerStack placeholder="hamburgerbar" id="hamburgerbar" direction="row" alignItems="center" justifyContent="space-between" color={stackcolor} padding="0px" height={height}>
            <HamburgerLogo padding="20px" height={height} name='logo' />
            <HamburgerIcon width="30px" height="30px" color={stackcolor} />
        </HamburgerStack>
    );

}

export default HamburgerBar;
