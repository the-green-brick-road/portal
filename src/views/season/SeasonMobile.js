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
import { Typography, Container, Link, Stack }                              from '@mui/material';
import { Table, TableRow, TableCell, TableBody }                           from '@mui/material';
import { useTheme }                                                        from '@mui/material/styles';
import { default as ExpandMoreIcon }                                       from '@mui/icons-material/ExpandMore';
import { default as OpenInBrowser }                                        from '@mui/icons-material/OpenInBrowser';
import { default as PictureAsPdf }                                         from '@mui/icons-material/PictureAsPdf';
import { default as Public }                                               from '@mui/icons-material/Public';
import { default as Star }                                                 from '@mui/icons-material/Star';
import { default as Event }                                                from '@mui/icons-material/Event';
import { default as MilitaryTech }                                         from '@mui/icons-material/MilitaryTech';

/* You Tube includes */
import YouTube                                                             from 'react-youtube'

/* Portal includes */
import { useLogging, useDesign }                                           from '../../providers';
import { ReactComponent as HudsonIcon }                                    from '../../assets/icons/hudson.svg';

/* Local includes */
import { SeasonAccordion, SeasonAccordionSummary, SeasonAccordionDetails } from './SeasonAccordion';

function SeasonMobile(props) {

    /* --------- Gather inputs --------- */
    const { data }                                    = props
    const { logText }                                 = useLogging();
    const { isDarkMode }                              = useDesign();
    const [width, setWidth]                           = useState(560);
    const [isRevealOpen, setIsRevealOpen]             = useState(false)
    const [isRobotGameOpen, setIsRobotGameOpen]       = useState(false)
    const [isGbrOpen, setIsGbrOpen]                   = useState(false)
    const [ localCompetitions, setLocalCompetitions ] = useState([]);
    const theme                                       = useTheme();
    const componentName                               = 'SeasonMobile';
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    /* -------- Defining sizes --------- */
    const video_width = width
    const video_height = Math.round(video_width / 560 * 315)


    /* ------- Preprocess competitions ------- */
    useEffect(() => {

        const local_competitions = [];

        if ('competitions' in data) {

            for (let i_competition = 0; i_competition < data.competitions.length; i_competition +=1) {

                if (local_competitions.length === 0) { local_competitions.push(data.competitions[i_competition]); }
                else {

                    let j_competition = 0
                    if (data.competitions[i_competition].date.seconds > local_competitions[local_competitions.length - 1].date.seconds) { local_competitions.push(data.competitions[i_competition]); }
                    else {

                        while((data.competitions[i_competition].date.seconds > local_competitions[j_competition].date.seconds) && ((j_competition + 1) < local_competitions.length)) { j_competition += 1 }
                        local_competitions.splice(j_competition, 0, data.competitions[i_competition]);

                    }

                }

            }

        }
        setLocalCompetitions(local_competitions)

    }, [data]);


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

    const handleGbr = (event, status) => {

        logText(componentName, 'debug', 'workflow', ` handleGbr : ${status}`);
        setIsGbrOpen(status)

    }

    let accordion_bgcol = theme.palette.common.white
    if ( isDarkMode ) { accordion_bgcol = theme.palette.common.black}

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

            {('competitions' in data) && (
                <Container style={{padding:10}}>
                    <Typography variant="h2">Competitions</Typography>
                    <Table>
                        <TableBody>
                            {localCompetitions.map((item, index) => { /* Loop on all competitions to create entries */

                                var time = new Date(1970, 0, 1); // Epoch
                                time.setSeconds(item.date.seconds);
                                const month = months[time.getMonth()];
                                const year = time.getYear() + 1900;
                                const date = time.getDate();

                                return(
                                    <Fragment key={index}>
                                        <TableRow>
                                            <TableCell style={{padding:5, fontSize:'14px', border:'none'}} colSpan={2}>
                                                <Stack direction="row" alignItems='center' >
                                                    {(item.level === 'regional') && (<HudsonIcon fill={theme.palette.primary.main} style={{height:theme.typography.body1.fontSize, marginRight:10 }}/>)}
                                                    {(item.level === 'international') && (<Public style={{height:theme.typography.body1.fontSize, color:theme.palette.primary.main, marginRight:10 }}/>)}
                                                    {item.name}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={1} style={{padding:5, fontSize:'14px'}}/>
                                            <TableCell colSpan={1} style={{padding:5, fontSize:'14px'}}>
                                                <Stack direction="row" alignItems='center' >
                                                    <Event style={{height:theme.typography.body1.fontSize, color:theme.palette.primary.main, marginRight:10 }}/>
                                                    <Typography style={{padding:0,fontSize:'14px'}}>{date}-{month}-{year}</Typography>
                                                </Stack>
                                                {('rank' in item) && (
                                                    <Stack direction="row" alignItems='center' >
                                                        <Star style={{height:theme.typography.body1.fontSize, color:theme.palette.primary.main, marginRight:10 }}/>
                                                        <Typography style={{padding:0,fontSize:'14px'}}>{item.rank}</Typography>
                                                    </Stack>
                                                )}
                                                {('award' in item) && (
                                                    <Stack direction="row" alignItems='center' style={{padding:0,fontSize:'14px'}}>
                                                        <MilitaryTech style={{height:theme.typography.body1.fontSize, color:theme.palette.primary.main, marginRight:10 }}/>
                                                        <Typography style={{padding:0,fontSize:'14px'}}>{item.award} award </Typography>
                                                    </Stack>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                )

                            })}
                        </TableBody>
                    </Table>
                </Container>
            )}
            <Container style={{padding:10}}>
                {('reveal' in data) && (
                    <SeasonAccordion elevation={0} onChange={handleReveal}>
                        <SeasonAccordionSummary expandIcon={<ExpandMoreIcon style={{margin:0}}/>} col={theme.palette.primary.main} bgcol={accordion_bgcol}>
                            <Typography variant="body2" style={{ fontWeight:'bold', fontSize:'12px' }}>Season Reveal</Typography>
                        </SeasonAccordionSummary>
                        <SeasonAccordionDetails>
                            {(isRevealOpen) && (<YouTube videoId={data['reveal']} opts={{ width: video_width, height:video_height, playerVars: {origin: 'https://the-green-brick-road.org', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>)}
                        </SeasonAccordionDetails>
                    </SeasonAccordion>
                )}
                {('resources' in data) && (
                    <SeasonAccordion  elevation={0}>
                        <SeasonAccordionSummary expandIcon={<ExpandMoreIcon style={{margin:0}}/>} col={theme.palette.primary.main} bgcol={accordion_bgcol}>
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
                        <SeasonAccordionSummary expandIcon={<ExpandMoreIcon style={{margin:0}}/>} col={theme.palette.primary.main} bgcol={accordion_bgcol}>
                            <Typography variant="body2" style={{ fontWeight:'bold', fontSize:'12px'}}>Robot Game</Typography>
                        </SeasonAccordionSummary>
                        <SeasonAccordionDetails>
                            {(isRobotGameOpen) && (<YouTube videoId={data['robot-game']} opts={{ width: video_width, height:video_height, playerVars: {origin: 'https://the-green-brick-road.org', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>)}
                        </SeasonAccordionDetails>
                    </SeasonAccordion>
                )}
                {(('robot-game-gbr' in data) || ('judging-session-gbr' in data)) && (
                    <SeasonAccordion  elevation={0} onChange={handleGbr}>
                        <SeasonAccordionSummary expandIcon={<ExpandMoreIcon style={{margin:0}}/>} col={theme.palette.primary.main} bgcol={accordion_bgcol}>
                            <Typography variant="body2" style={{ fontWeight:'bold', fontSize:'12px'}}>Green Brick Road</Typography>
                        </SeasonAccordionSummary>
                        <SeasonAccordionDetails>
                            {(isGbrOpen) && ('robot-game-gbr' in data) && (
                                <Fragment>
                                    <Typography variant="body2" style={{ marginTop:'10px', textAlign:'center', color:theme.palette.primary.main, textDecoration:'none', fontSize:'16px', fontWeight:'bold' }}> Our robot game solution </Typography>
                                    <YouTube videoId={data['robot-game-gbr']} opts={{ width: video_width, height:video_height, playerVars: {origin: 'https://the-green-brick-road.org', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>
                                </Fragment>
                            )}
                            {(isGbrOpen) && ('judging-session-gbr' in data) && (
                                <Link href={data['judging-session-gbr']} target="_self">
                                    <Stack direction="row" justifyContent='center'><PictureAsPdf/><Typography variant="body2" style={{ textAlign:'center', color:theme.palette.primary.main, textDecoration:'none', fontSize:'16px', fontWeight:'bold' }}> Our judging session presentation </Typography></Stack>
                                </Link>
                            )}
                        </SeasonAccordionDetails>
                    </SeasonAccordion>

                )}
            </Container>
        </Fragment>
    );

}

export default SeasonMobile;