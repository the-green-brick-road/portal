/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Image component mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Box }             from '@mui/material';

function Image(props) {

    /* --------- Gather inputs --------- */
    const { style={} }    = props;

    const local_style = JSON.parse(JSON.stringify(style))

    if (!('backgroundColor' in local_style)) { local_style['backgroundColor'] = 'blue' }

    /* ----------- Define HTML --------- */
    /* eslint-disable padded-blocks */
    return (
        <Box style={local_style} />
    );
    /* eslint-enable padded-blocks */

}

export default Image;
