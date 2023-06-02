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

/* Portal includes */
import { useDesign }                   from '../../providers';

/* Local includes */
import PostParser                      from './PostParser'

function Post(props) {

    /* --------- Gather inputs --------- */
    const { data }          = props
    const theme             = useTheme();
    const { sizes }         = useDesign();
    //const componentName     = 'Post';


    /* ------- Sort posts by date ------ */
    const local_media = [];
    if ('media' in data) {

        for (let i_media = 0; i_media < data.media.length; i_media +=1) {

            if (local_media.length === 0) { local_media.push(data.media[i_media]); }
            else {

                let j_media = 0
                if(data.media[i_media] > local_media[local_media.length - 1]) { local_media.push(data.media[i_media]); }
                else {

                    while((data.media[i_media] > local_media[j_media]) && ((j_media + 1) < local_media.length)) { j_media += 1 }
                    local_media.splice(j_media, 0, data.media[i_media]);

                }

            }

        }

    }

    let code = ''
    if ('code' in data) {

        code = data.code
        code = code.replaceAll(`\${theme.palette.primary.main}`, theme.palette.primary.main )
        code = code.replaceAll(`\${theme.palette.secondary.main}`, theme.palette.secondary.main )
        code = code.replaceAll(`\${theme.palette.common.white}`, theme.palette.common.white )
        code = code.replaceAll(`\${theme.palette.common.black}`, theme.palette.common.black )
        if ('media' in data) {

            for (let i_media = 0; i_media < data.media.length; i_media +=1) {

                code = code.replaceAll(`\${local_media[${i_media}]}`,local_media[i_media])

            }

        }

    }

    /* ----------- Define HTML --------- */
    return (
        <Fragment>
            <Container style={{ position:'absolute', zIndex:5, backgroundColor:'rgba(255,255,255,0.7)', width:'100%', height:sizes['menu-height']}}/>
            <Container style={{ width:'100%', height:data['image-height'], padding:0, backgroundColor:theme.palette.common.black, position:'relative' }}>
                <img src={data.image} style={{ pointerEvents: 'none', width:'100%', height:data['image-height'], objectFit: 'cover', objectPosition: data['image-position'] }} alt={data.name}/>
            </Container>
            <Container style={{ fontSize:'14px', paddingTop:'20px', paddingBottom:'20px' }}>
                <Typography variant="h1">{data.title}</Typography>
            </Container>
            <PostParser code={code}/>
        </Fragment>
    );

}

export default Post;