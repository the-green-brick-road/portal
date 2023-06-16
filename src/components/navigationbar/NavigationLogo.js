/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Navigation Logo styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @18 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { styled }   from '@mui/system';
import { Link }     from '@mui/material';

/* Website includes */
import { Image }    from '../../components';

const NavigationLogoLink = styled(Link)(({ logopadding }) => ({

    height: '100%',
    width: 'auto',
    marginRight: '5px',
    paddingBottom: logopadding,
    paddingTop: logopadding,

}));

function NavigationLogo(props) {

    /* --------- Gather inputs --------- */
    const { name, padding } = props;

    /* ----------- Define HTML --------- */
    return (
        <NavigationLogoLink aria-label="navigation-logo" href="/" logopadding={padding}>
            <Image
                name={name}
                style={{ height: '100%', verticalAlign: 'middle' }}
            />
        </NavigationLogoLink>
    );

}

export default NavigationLogo;
