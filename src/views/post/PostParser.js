/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Post page definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Container }       from '@mui/material';

function PostParser(props) {

    /* --------- Gather inputs --------- */
    const { code }          = props
    //const componentName     = 'Post';

    /* ---------- Parsing tags ---------- */

    var el = document.createElement( 'html' );
    el.innerHTML = code


    /* ----------- Define HTML --------- */
    return (
        <Container>
            <div dangerouslySetInnerHTML={{__html: code}}></div>
        </Container>
    );

}

export default PostParser;