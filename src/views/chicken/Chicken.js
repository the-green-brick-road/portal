
/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Chicken view component
# -------------------------------------------------------
# Nadège LEMPERIERE, @10 june 2023
# Latest revision: 10 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Fragment }                    from 'react';

/* Material UI includes */
import { Typography, Container, Link } from '@mui/material';

/* Portal includes */
import { useDesign }                   from '../../providers';
import { Image }                       from '../../components'


function Chicken() {

    /* --------- Gather inputs --------- */
    const { sizes }     = useDesign();
    //const componentName = 'Chicken'

    /* ----------- Define HTML --------- */
    return (
        <Fragment>
            <Container style={{ backgroundColor:'rgba(255,255,255,0)', width:'100%', height:sizes['menu-height'], padding:0, position:'relative' }}/>
            <Container style={{ width:'100%', padding:0, position:'relative' }}>
                <Image name="chicken" style={{ width:'100%', pointerEvents: 'none' }}/>
            </Container>
            <Typography style={{textAlign:'center', fontSize:'11px'}}> From <Link>https://flltutorials.com/</Link></Typography>
        </Fragment>
    );

}


export default Chicken;