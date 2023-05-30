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

/* React includes */
import { Fragment }                    from 'react';

/* Material UI includes */
import { Container, Typography }       from '@mui/material';
import { useTheme }                    from '@mui/material/styles';

function Post(props) {

    /* --------- Gather inputs --------- */
    const { data }          = props
    const theme             = useTheme();
    //const componentName     = 'Post';


    /* ----------- Define HTML --------- */
    return (
        <Fragment>
            <Container style={{ width:'100%', height:'70vh', padding:0, backgroundColor:theme.palette.common.black, position:'relative' }}>
                <img src={data.image} style={{ width:'100%', height:'70vh', objectFit: 'cover', objectPosition: data['image-position'] }} alt={data.name}/>
            </Container>
            <Container style={{ fontSize:'14px', paddingTop:'20px', paddingBottom:'20px' }}>
                <Typography variant="h1">{data.title}</Typography>
            </Container>
        </Fragment>
    );

}

export default Post;