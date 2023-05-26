/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Layout bar styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { AppBar }    from '@mui/material';
import { useTheme }  from '@mui/material/styles';

/* Portal includes */
import { useDesign } from '../../providers';

function LayoutBar(props) {

    /* --------- Gather inputs --------- */
    const { height, width, top, left, children } = props;

    const { isSliding } = useDesign();
    const theme         = useTheme();
    //const componentName = 'LayoutBar';

    /* ----------- Define HTML --------- */
    return (
        <AppBar elevation={isSliding ? 4 : 0} style={{ position:'absolute', height:height, display:'flex', width:width, top:top, left:left, backgroundColor: isSliding ? theme.palette.primary.main : 'rgba(255,255,255,0)'}}>
            {children}
        </AppBar>
    );

}

export default LayoutBar;
