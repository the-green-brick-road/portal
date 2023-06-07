/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Footer component
# -------------------------------------------------------
# Nadège LEMPERIERE, @26 may 2023
# Latest revision: 26 may 2023
# ---------------------------------------------------- */

/* Material includes */
import { Paper } from '@mui/material';

/* Website includes */
import { useDesign } from '../../providers';

/* Local includes */
import FooterDesktop from './FooterDesktop';
import FooterMobile from './FooterMobile';

function Footer(props) {

    /* --------- Gather inputs --------- */
    const { color, isDark } = props;
    const { screen }        = useDesign();
    //const componentName = 'Footer';

    /* ----------- Define HTML --------- */
    return (
        <Paper id="footer" square={true} style={{ backgroundColor:color, position:'relative', padding:'0px', bottom:0 }}>
            {(screen === 'large') && (<FooterDesktop isDark={isDark} />)}
            {(screen !== 'large') && (<FooterMobile isDark={isDark} />)}
        </Paper>
    );

}

export default Footer;
