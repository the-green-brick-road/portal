/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hamburger Icon component
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Button }              from '@mui/material';
import { styled }              from '@mui/system';
import { Menu as MenuIcon }    from '@mui/icons-material';

/* Portal includes */
import { useMenu, useLogging } from '../../providers';

const HamburgerIconBox = styled(Button)(({ col, width, height }) => ({
    right: '0px',
    textAlign: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: col,
    borderRadius: '0px',
    backgroundColor: 'rgba(255,255,255,0)',
    width,
    height,
    padding: 0,
    minWidth: '40px',
}));

function HamburgerIcon(props) {

    /* --------- Gather inputs --------- */
    const { color, width, height }     = props;
    const { isMenuOpen, setMenuState } = useMenu();
    const { logText }                  = useLogging();
    const componentName = 'HamburgerIcon';

    /* ------- Manage menu click ------- */
    const handleHamburgerMenuClick = () => {

        logText(componentName, 'debug', 'workflow', ' handleHamburgerMenuClick');
        setMenuState(!isMenuOpen)

    };

    /* ----------- Define HTML --------- */
    return (
        <HamburgerIconBox aria-label="open drawer" tabIndex={0} type="button" size="small" onClick={handleHamburgerMenuClick} col={color} height={height} width={width} style={{ backgroundColor:'rgba(255,255,255,0)', borderColor:color, borderStyle:'solid' }}>
            <MenuIcon style={{ width, height: width, color }} />
        </HamburgerIconBox>
    );

}

export default HamburgerIcon;
