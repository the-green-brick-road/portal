/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hamburger Logo component
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */


/* Material UI includes */
import { Link }     from '@mui/material';
import { styled }   from '@mui/system';

/* Portal includes */
import { Image }    from '../../components';

const HamburgerLogoLink = styled(Link)(({ padding, height }) => ({
    height,
    paddingBottom: padding,
    paddingTop: padding,
    paddingLeft: '10px',
    paddingRight: '10px',
}));

function HamburgerLogo(props) {

    /* --------- Gather inputs --------- */
    const { padding, name, height } = props;

    /* ---------- Derive size ---------- */
    const logoHeight = `calc( ${height} - 2 * ${padding} )`;

    /* ----------- Define HTML --------- */
    return (
        <HamburgerLogoLink href="/" height={height} padding={padding}>
            <Image name={name} style={{ height: logoHeight, verticalAlign: 'middle', top: padding }} />
        </HamburgerLogoLink>
    );

}

export default HamburgerLogo;
