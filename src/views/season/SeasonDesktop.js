/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Season page definition for desktop
# -------------------------------------------------------
# Nadège LEMPERIERE, @19 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Fragment, useState, useEffect }                from 'react';

/* Material UI includes */
import { Container, Tabs, Tab, Box, Link, Typography }  from '@mui/material';
import { Table, TableRow, TableCell, TableBody, Stack } from '@mui/material';
import { default as OpenInBrowser }                     from '@mui/icons-material/OpenInBrowser';
import { default as PictureAsPdf }                      from '@mui/icons-material/PictureAsPdf';
import { default as Public }                            from '@mui/icons-material/Public';
import { default as Star }                              from '@mui/icons-material/Star';
import { default as MilitaryTech }                      from '@mui/icons-material/MilitaryTech';
import { useTheme }                                     from '@mui/material/styles';

/* You Tube includes */
import YouTube                                          from 'react-youtube'

/* Portal includes */
import { ReactComponent as HudsonIcon }                 from '../../assets/icons/hudson.svg';
import { useLogging, useDesign }                        from '../../providers';
import { Image }                                        from '../../components';

function SeasonDesktop(props) {

    /* --------- Gather inputs --------- */
    const { data }                                    = props
    const { logText }                                 = useLogging();
    const { sizes }                                   = useDesign();
    const [tab, setTab]                               = useState(0);
    const theme                                       = useTheme();
    const [ localCompetitions, setLocalCompetitions ] = useState([]);
    const componentName                               = 'Season';
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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


    /* ------ Manage tab selection ----- */
    const handleChange = (event) => {

        logText(componentName, 'debug', 'workflow', ' handleChange');
        setTab(parseInt(event.target.id))

    };

    /* ----------- Define HTML --------- */
    return (
        <Fragment>
            <Container style={{ backgroundColor:'#ffffff', width:'100%', height:sizes['menu-height'], padding:0, position:'relative' }}/>
            <Container style={{ width:'100%', padding:0, position:'relative' }}>
                <Image name="seasons" style={{ width:'100%', pointerEvents: 'none' }}/>
                <Container style={{ position: 'absolute', zIndex: '1', top: '0%', left: '0%', width: '20%'}}>
                    <img src={data.image} style={{ pointerEvents: 'none', width:'100%', position: 'absolute', zIndex:1}} alt={data.name}/>
                </Container>
            </Container>
            {('description' in data) && (
                <Container style={{padding:10}}>
                    { data.description.split('<br/>').map((item, index) => {

                        return(
                            <Typography variant="body2" key={index} style={{ fontSize:'17px', textAlign:'justify', paddingTop:5, paddingBottom:5 }}>{item}</Typography>
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
                                    <TableRow key={item}>
                                        <TableCell style={{padding:5, fontSize:'14px'}}>
                                            <Stack direction="row" alignItems='center' >
                                                {(item.level === 'regional') && (<HudsonIcon fill={theme.palette.primary.main} style={{height:theme.typography.body1.fontSize, marginRight:10 }}/>)}
                                                {(item.level === 'international') && (<Public style={{height:theme.typography.body1.fontSize, color:theme.palette.primary.main, marginRight:10 }}/>)}
                                                {item.name}
                                            </Stack>
                                        </TableCell>
                                        <TableCell style={{padding:5, fontSize:'14px'}}>
                                            {date}-{month}-{year}
                                        </TableCell>
                                        <TableCell style={{padding:5, fontSize:'14px'}}>
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
                                )

                            })}
                        </TableBody>
                    </Table>
                </Container>
            )}
            <Container style={{padding:10}}>
                <Box>
                    <Tabs value={tab} onChange={handleChange}>
                        {('reveal' in data) && (<Tab label="Season Reveal" id="0" value={0} style={{ color:theme.typography.body2.color, fontWeight:'bold', textTransform:'capitalize' }} />)}
                        {('resources' in data) && (<Tab label="Resources" id="1" value={1} style={{ color:theme.typography.body2.color, fontWeight:'bold', textTransform:'capitalize' }} />)}
                        {('robot-game' in data) && (<Tab label="Robot Game" id="2" style={{ color:theme.typography.body2.color, fontWeight:'bold', textTransform:'capitalize' }} />)}
                        {(('judging-session-gbr' in data) || ('robot-game-gbr' in data)) && (<Tab label="Green Brick Road " id="3" style={{ color:theme.typography.body2.color, fontWeight:'bold', textTransform:'capitalize' }} />)}

                    </Tabs>
                </Box>
                {(tab === 0) && ('reveal' in data) && (<YouTube videoId={data['reveal']} opts={{ width: '560', height:'315', playerVars: { origin: 'https://the-green-brick-road.org', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>)}
                {(tab === 1) && ('resources' in data) && (
                    <Table style={{ width:'100%' }}>
                        <TableBody>
                            { data['resources'].map((item, index) => {

                                return(
                                    <TableRow key={index}>
                                        <TableCell style={{ width:'0%', padding:0, borderStyle:'none' }}>
                                            <Link href={item.url} variant="body2" target="_blank" style={{ color:theme.typography.body2.color, textDecoration:'none' }}><OpenInBrowser style={{ color:theme.palette.primary.main }}/></Link>
                                        </TableCell>
                                        <TableCell style={{ textAlign:'left', paddingTop:0, paddingBottom:0, paddingLeft:10, borderStyle:'none' }}>
                                            <Link href={item.url} variant="body2" target="_blank" style={{ color:theme.typography.body2.color, textDecoration:'none', fontSize:'11px' }}>{item.name}</Link>
                                        </TableCell>
                                    </TableRow>
                                )

                            })}
                        </TableBody>
                    </Table>
                )}
                {(tab === 2) && ('robot-game' in data) && (<YouTube videoId={data['robot-game']} opts={{ width: '560', height:'315', playerVars: {origin: 'https://the-green-brick-road.org', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>)}
                {(tab === 3) && (

                    <Stack direction="column">
                        {('robot-game-gbr' in data) && (
                            <Fragment>
                                <Typography variant="body2" style={{ marginTop:'10px', textAlign:'center', color:theme.palette.primary.main, textDecoration:'none', fontSize:'17px', fontWeight:'bold' }}> Our robot game solution </Typography>
                                <YouTube videoId={data['robot-game-gbr']} opts={{ width: '560', height:'315', playerVars: {origin: 'https://the-green-brick-road.org', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>
                            </Fragment>
                        )}
                        {('judging-session-gbr' in data) && (
                            <Link href={data['judging-session-gbr']} target="_self">
                                <Stack direction="row" justifyContent='center' style={{ marginTop:'10px' }}><PictureAsPdf/><Typography variant="body2" style={{ textAlign:'center', color:theme.palette.primary.main, textDecoration:'none', fontSize:'17px', fontWeight:'bold' }}> Our judging session presentation </Typography></Stack>
                            </Link>
                        )}
                    </Stack>
                )}
            </Container>
        </Fragment>
    );

}

export default SeasonDesktop;