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
import { Fragment, useState }                    from 'react';

/* Material UI includes */
import { Container, Tabs, Tab, Box, Link }       from '@mui/material';
import { Table, TableRow, TableCell, TableBody } from '@mui/material';
import { OpenInBrowser }                         from '@mui/icons-material';
import { useTheme }                              from '@mui/material/styles';

/* You Tube includes */
import YouTube                                   from 'react-youtube'

/* Portal includes */
import { useLogging }                            from '../../providers';


function SeasonDesktop(props) {

    /* --------- Gather inputs --------- */
    const { data } = props
    const { logText }       = useLogging();
    const [tab, setTab]     = useState(0);
    const theme             = useTheme();
    const componentName     = 'Season';

    /* ------ Manage tab selection ----- */
    const handleChange = (event) => {

        logText(componentName, 'debug', 'workflow', ' handleChange');
        setTab(parseInt(event.target.id))

    };

    /* ----------- Define HTML --------- */
    return (
        <Fragment>
            <Container style={{ width:'100%', height:'30vh', padding:0, backgroundColor:theme.palette.common.black, position:'relative' }}>
                <img src={data.image} style={{ position: 'absolute', zIndex:1, top: '11vh', right: '2%', height:'15vh' }} alt={data.name}/>
            </Container>
            <Container style={{padding:10}}>
                <Box>
                    <Tabs value={tab} onChange={handleChange}>
                        <Tab label="Season Reveal" id="0" value={0} style={{ fontWeight:'bold', textTransform:'capitalize' }} />
                        <Tab label="Resources" id="1" value={1} style={{ fontWeight:'bold', textTransform:'capitalize' }} />
                        <Tab label="Robot Game" id="2" style={{ fontWeight:'bold', textTransform:'capitalize' }} />

                    </Tabs>
                </Box>
                {(tab === 0) && ('reveal' in data) && (<YouTube videoId={data['reveal']} opts={{ width: '560', height:'315', playerVars: {origin: 'https://mywebsite.com', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>)}
                {(tab === 1) && ('resources' in data) && (
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
                )}
                {(tab === 2) && ('robot-game' in data) && (<YouTube videoId={data['robot-game']} opts={{ width: '560', height:'315', playerVars: {origin: 'https://mywebsite.com', enablejsapi: '1'} }} style={{ paddingTop: '20px', paddingBottom: '20px', textAlign:'center' }}/>)}
            </Container>
        </Fragment>
    );

}

export default SeasonDesktop;