/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Season page definition for mobile
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Fragment, useState, useEffect }                                   from 'react';

/* Material UI includes */
import { Typography, Container, Link }                                     from '@mui/material';
import { Table, TableRow, TableCell, TableBody }                           from '@mui/material';
import { useTheme }                                                        from '@mui/material/styles';
import { default as ExpandMoreIcon }                                       from '@mui/icons-material/ExpandMore';
import { default as OpenInBrowser }                                        from '@mui/icons-material/OpenInBrowser';

/* You Tube includes */
import YouTube                                                             from 'react-youtube'

/* Portal includes */
import { useLogging }                                                      from '../../providers';

/* Local includes */
import { SeasonAccordion, SeasonAccordionSummary, SeasonAccordionDetails } from './SeasonAccordion';

function SeasonMobile(props) {

    /* --------- Gather inputs --------- */
    const { data }                              = props
    const { logText }                           = useLogging();
    const [width, setWidth]                     = useState(560);
    const [isRevealOpen, setIsRevealOpen]       = useState(false)
    const [isRobotGameOpen, setIsRobotGameOpen] = useState(false)
    const theme                                 = useTheme();
    const componentName                         = 'SeasonMobile';

    /* -------- Defining sizes --------- */
    const video_width = width
    const video_height = Math.round(video_width / 560 * 315)

    /* -------- Managing resize -------- */
    const handleResize = () => {

        logText(componentName, 'debug', 'workflow', ' handleResize');
        const component = document.getElementById('season-mobile')
        if (component !== null) {

            setWidth(document.getElementById('season-mobile').clientWidth - 50)

        }

    };
    useEffect(() => { handleResize() }, []); /* eslint-disable-line react-hooks/exhaustive-deps */
    window.addEventListener('resize', handleResize)


    /* --- Managing youtube display ---- */
    // Youtube component does not support being hidden when accordion is closed
    // The component shall not exist when accordion is closed
    const handleReveal = (event, status) => {

        logText(componentName, 'debug', 'workflow', ` handleReveal : ${status}`);
        setIsRevealOpen(status)

    }

    const handleRobotGame = (event, status) => {

        logText(componentName, 'debug', 'workflow', ` handleRobotGame : ${status}`);
        setIsRobotGameOpen(status)

    }

    /* ----------- Define HTML --------- */
    return (
        <Fragment >
            <Container id='season-mobile' style={{ width:'100%', height:'30vh', padding:0, backgroundColor:theme.palette.common.black, position:'relative' }}>
                <img src={data.image} style={{ position: 'absolute', zIndex:1, top: '11vh', right: '2%', height:'15vh' }} alt={data.name}/>
            </Container>
            {('description' in data) && (
                <Container style={{padding:10}}>
                    { data.description.split('<br/>').map((item, index) => {

                        return(
                            <Typography variant="body2" key={index} style={{ fontSize:'14px', textAlign:'justify', padding:5 }}>{item}</Typography>
                        )

                    })}
                </Container>
            )}
            <Container style={{padding:10}}>
                {('reveal' in data) && (
                    <SeasonAccordion elevation={0} onChange={handleReveal}>
                        <SeasonAccordionSummary expandIcon={<ExpandMoreIcon style={{margin:0}}/>} col={theme.palette.primary.main}>
                            <Typography variant="body2" style={{ fontWeight:'bold', fontSize:'12px' }}>Season Reveal</Typography>
                        </SeasonAccordionSummary>
                        <SeasonAccordionDetails>
                            {(isRevealOpen) && (<YouTube videoId={data['reveal']} opts={{ width: video_width, height:video_height, playerVars: {origin: 'https://the-green-brick-road.org', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>)}
                        </SeasonAccordionDetails>
                    </SeasonAccordion>
                )}
                {('resources' in data) && (
                    <SeasonAccordion  elevation={0}>
                        <SeasonAccordionSummary expandIcon={<ExpandMoreIcon style={{margin:0}}/>} col={theme.palette.primary.main}>
                            <Typography variant="body2" style={{ fontWeight:'bold', fontSize:'12px'}} >Resources</Typography>
                        </SeasonAccordionSummary>
                        <SeasonAccordionDetails>
                            <Table style={{ width:'100%' }}>
                                <TableBody>
                                    { data['resources'].map((item, index) => { /* Loop on all resources */

                                        return(
                                            <TableRow key={index}>
                                                <TableCell style={{ width:'0%', padding:0, borderStyle:'none' }}>
                                                    <Link href={item.url} variant="body2" target="_blank" style={{ color: 'black', textDecoration:'none' }}><OpenInBrowser style={{ color:theme.palette.primary.main }}/></Link>
                                                </TableCell>
                                                <TableCell style={{ textAlign:'left', paddingTop:0, paddingBottom:0, paddingLeft:10, borderStyle:'none' }}>
                                                    <Link href={item.url} variant="body2" target="_blank" style={{ color: 'black', textDecoration:'none', fontSize:'11px' }}>{item.name}</Link>
                                                </TableCell>
                                            </TableRow>
                                        )

                                    })}
                                </TableBody>
                            </Table>
                        </SeasonAccordionDetails>
                    </SeasonAccordion>
                )}
                {('robot-game' in data) && (
                    <SeasonAccordion  elevation={0} onChange={handleRobotGame}>
                        <SeasonAccordionSummary expandIcon={<ExpandMoreIcon style={{margin:0}}/>} col={theme.palette.primary.main}>
                            <Typography variant="body2" style={{ fontWeight:'bold', fontSize:'12px'}}>Robot Game</Typography>
                        </SeasonAccordionSummary>
                        <SeasonAccordionDetails>
                            {(isRobotGameOpen) && (<YouTube videoId={data['robot-game']} opts={{ width: video_width, height:video_height, playerVars: {origin: 'https://the-green-brick-road.org', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>)}
                        </SeasonAccordionDetails>
                    </SeasonAccordion>
                )}
            </Container>
        </Fragment>
    );

}

export default SeasonMobile;