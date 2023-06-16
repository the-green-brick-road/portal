/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Robot view component
# -------------------------------------------------------
# Nadège LEMPERIERE, @07 june 2023
# Latest revision: 12 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler, useState }                                from 'react';

/* Material UI includes */
import { Container, Typography, Stack, Divider, Pagination } from '@mui/material';
import { default as RadioButtonChecked }                     from '@mui/icons-material/RadioButtonChecked';
import { useTheme }                                          from '@mui/material/styles';

/* Portal includes */
import { useDesign, useLogging }                             from '../../providers';

function Robot(props) {

    /* --------- Gather inputs --------- */
    const { data }                            = props
    const theme                               = useTheme();
    const { sizes }                           = useDesign();
    const { logText, onRender }               = useLogging();
    const [ hoverFeature, setHoverFeature ]   = useState({id:"-1"})
    const [ selectFeature, setSelectFeature ] = useState({id:"-1"})
    const [ selectView, setSelectView ]       = useState(0)
    const componentName         = 'Robot';

    /* View management functions */
    const handleViewChange = (event, value) => {

        logText(componentName, 'debug', 'workflow', ' handleViewChange --- BEGIN');
        setSelectView(value - 1)
        setHoverFeature({id:"-1"})
        setSelectFeature({id:"-1"})

    };

    /* Feature info display management functions */
    const handleFeatureHover = (event, value) => {

        logText(componentName, 'debug', 'workflow', ' handleFeatureHover --- BEGIN');

        let id = -1
        if (event.target.parentNode.getAttribute('id') !== null) { id = event.target.parentNode.getAttribute('id') }
        else if (event.target.getAttribute('id') !== null) { id = event.target.getAttribute('id')}

        if (value) {

            for( let i_feature = 0; i_feature < data.features.length; i_feature ++) {

                if(data.features[i_feature].id === id ) { setHoverFeature(data.features[i_feature]) }

            }

        }
        else { setHoverFeature({id:"-1"}) }

    };

    /* Feature selection management functions */
    const handleFeatureClick = (event) => {

        logText(componentName, 'debug', 'workflow', ' handleFeatureClick --- BEGIN');

        let id = -1
        if (event.target.parentNode.getAttribute('id') !== null) { id = event.target.parentNode.getAttribute('id') }
        else if (event.target.getAttribute('id') !== null) { id = event.target.getAttribute('id')}

        if(selectFeature.id === id) { setSelectFeature({id:"-1"})}
        else {

            for( let i_feature = 0; i_feature < data.features.length; i_feature ++) {

                if(data.features[i_feature].id === id ) { setSelectFeature(data.features[i_feature]) }

            }

        }

    };

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Container style={{ backgroundColor:'#eeeeee', width:'100%', height:sizes['menu-height']}}/>
            <Container style={{ backgroundColor:'#eeeeee', fontFamily:data.font, fontSize:'14px', paddingTop:'20px', paddingBottom:'20px' }}>
                <Typography style={{ textAlign:'center', color:theme.typography.h1.color, fontFamily:data.font, fontSize:theme.typography.h1.fontSize}} >{data.name}</Typography>
            </Container>
            <Container style={{ position:'relative', backgroundColor:'#eeeeee', fontFamily:data.font, fontSize:'14px', padding:0}}>
                <img loading="lazy" src={data.views[selectView].image} style={{ position:'relative', width:'100%', height:data['image-height'], objectFit: 'cover', objectPosition: data['image-position'] }} alt={data.name}/>
                { ('features' in data.views[selectView]) && (data.views[selectView].features.map((jtem, jndex) => { /* Loop on all features to display them*/

                    const x_position = `${jtem.x}%`
                    const y_position = `${jtem.y}%`
                    const width =  `calc(100% - ${jtem.x}%)`

                    return(
                        <Container key={jtem.id} style={{position:'absolute', width:width, padding:0, top:y_position, left:x_position}}>
                            {((hoverFeature.id === jtem.id) || (selectFeature.id === jtem.id)) && (
                                <Stack direction="row" alignItems="center">
                                    <RadioButtonChecked id={jtem.id} onClick={handleFeatureClick} onMouseOver={(evt) => handleFeatureHover(evt, true)} onMouseOut={(evt) => handleFeatureHover(evt, false)} style={{color:theme.palette.common.white}}/>
                                    <Divider style={{ color:theme.palette.common.white, borderColor:theme.palette.common.white, width:'30px', paddingTop:5 }}/>
                                    <Typography style={{paddingLeft:'5px', color:theme.palette.common.white}}> {data.features[jtem.id].name} </Typography>
                                </Stack>
                            )}
                            {(hoverFeature.id !== jtem.id) && (selectFeature.id !== jtem.id) && (<RadioButtonChecked id={jtem.id} onClick={handleFeatureClick} onMouseOver={(evt) => handleFeatureHover(evt, true)} onMouseOut={(evt) => handleFeatureHover(evt, false)} style={{color:theme.palette.common.white}}/>)}

                        </Container>
                    )

                }))}
            </Container>
            <Stack direction="row" justifyContent="center"> <Pagination size="small" count={data.views.length} onChange={handleViewChange}/></Stack>
            <Container>
                <Typography>{selectFeature.name}</Typography>
                <Typography>{selectFeature.description}</Typography>
                {('media' in selectFeature) && (
                    <video autoPlay muted loop height="300">
                        <source src={selectFeature.media} type={selectFeature['media-type']}/>
                        Your browser does not support the video tag.
                    </video>
                )}
            </Container>

        </Profiler>
    );

}

export default Robot;