/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Footer component
# -------------------------------------------------------
# Nadège LEMPERIERE, @26 may 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }              from 'react';

/* Material includes */
import { Paper }                 from '@mui/material';

/* Portal includes */
import { useDesign, useLogging } from '../../providers';

/* Local includes */
import FooterDesktop             from './FooterDesktop';
import FooterMobile              from './FooterMobile';

function Footer(props) {

    /* --------- Gather inputs --------- */
    const { color, isDark } = props;
    const { screen }        = useDesign();
    const { onRender }      = useLogging();
    const componentName = 'Footer';

    /* -------- Defining theme --------- */
    let paddingLeft = 5
    let paddingRight = 5
    if( screen === 'large' ) {  paddingLeft = 11; paddingRight = 20 }

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Paper id="footer" square={true} style={{ backgroundColor:color, position:'relative', paddingLeft:paddingLeft, paddingRight:paddingRight, paddingBottom:0, paddingTop:0, bottom:0 }}>
                {(screen === 'large') && (<FooterDesktop isDark={isDark} />)}
                {(screen !== 'large') && (<FooterMobile isDark={isDark} />)}
            </Paper>
        </Profiler>
    );

}

export default Footer;
