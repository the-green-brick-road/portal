/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Team page definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @09 june 2023
# Latest revision: 09 june 2023
# ---------------------------------------------------- */

/* React includes */
import { useEffect, Profiler, useState }                        from 'react';

/* Material UI includes */
import { Card, CardContent, CardMedia, CardHeader, Container }  from '@mui/material';
import { Grid, Typography, Paper }                              from '@mui/material';
import { useTheme }                                             from '@mui/material/styles';

/* Portal includes */
import { useTeam, useDesign, useLogging }                       from '../../providers';
import { Image }                                                from '../../components'

function Team() {

    /* --------- Gather inputs --------- */
    const { team }                                = useTeam();
    const { onRender }                            = useLogging();
    const theme                                   = useTheme();
    const { isWebpSupported }                     = useDesign();
    const [ localTeam, setLocalTeam ]             = useState([])
    const [ localAlumni, setLocalAlumni ]         = useState([])
    const componentName = 'Team'

    /* ------- Preprocess members ------- */
    useEffect(() => {

        const local_team = [];
        const local_alumni = [];
        const team_keys = Object.keys(team)

        for (let i_member = 0; i_member < team_keys.length; i_member +=1) {

            if (team[team_keys[i_member]].grade !== -1) {

                if (local_team.length === 0) { local_team.push(team[team_keys[i_member]]); }
                else {

                    let j_member = 0
                    if(team[team_keys[i_member]].grade < local_team[local_team.length - 1].grade) { local_team.push(team[team_keys[i_member]]); }
                    else if ((team[team_keys[i_member]].grade === local_team[local_team.length - 1].grade) && (team[team_keys[i_member]].name > local_team[local_team.length - 1].name)) { local_team.push(team[team_keys[i_member]]); }
                    else {

                        while((team[team_keys[i_member]].grade < local_team[j_member].grade) && ((j_member + 1) < local_team.length)) { j_member += 1 }
                        while((team[team_keys[i_member]].grade === local_team[j_member].grade) && (team[team_keys[i_member]].name > local_team[j_member].name) && ((j_member + 1) < local_team.length)) { j_member += 1 }
                        local_team.splice(j_member, 0, team[team_keys[i_member]]);

                    }

                }

            }
            else {

                if (local_alumni.length === 0) { local_alumni.push(team[team_keys[i_member]]); }
                else {

                    let j_member = 0
                    if(team[team_keys[i_member]].end.seconds < local_alumni[local_alumni.length - 1].end.seconds) { local_alumni.push(team[team_keys[i_member]]); }
                    else if ((team[team_keys[i_member]].end.seconds === local_alumni[local_alumni.length - 1].end.seconds) && (team[team_keys[i_member]].name > local_alumni[local_alumni.length - 1].name)) { local_alumni.push(team[team_keys[i_member]]); }
                    else {

                        while((team[team_keys[i_member]].end.seconds < local_alumni[j_member].end.seconds) && ((j_member + 1) < local_alumni.length)) { j_member += 1 }
                        while((team[team_keys[i_member]].end.seconds === local_alumni[j_member].end.seconds) && (team[team_keys[i_member]].name > local_alumni[j_member].name) && ((j_member + 1) < local_alumni.length)) { j_member += 1 }
                        local_alumni.splice(j_member, 0, team[team_keys[i_member]]);

                    }

                }

            }

        }
        setLocalTeam(local_team)
        setLocalAlumni(local_alumni)

    }, [team]);


    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Container style={{ width:'100%', padding:0, position:'relative' }}>
                <Image name="team" style={{ width:'100%', pointerEvents: 'none' }}/>
            </Container>
            <Container style={{ width:'100%', overflowX: 'hidden', overflowY: 'hidden' }}>
                <Typography variant="h1">Our team</Typography>
                <Grid container columns={24}>
                    { localTeam.map((item, index) => { /* Loop on all members to create entries */

                        const coding_color = '#84cd54'
                        const building_color = '#859780'
                        const year_color = '#3ded97'
                        const grade_color = '#707d3b'

                        var time = new Date(1970, 0, 1); // Epoch
                        time.setSeconds(item.start.seconds);
                        const year_start = time.getYear() + 1900;
                        let year_stop = 0
                        if ('end' in item ) {

                            time = new Date(1970, 0, 1)
                            time.setSeconds(item.end.seconds);
                            year_stop = time.getYear() + 1900;

                        }

                        return(
                            <Grid item xs={24} sm={12} md={8} lg={6} key={item.id} style={{padding:0}}>
                                <Card elevation={4} style={{ backgroundColor:'#eeeeee', margin:10 }}>
                                    {('image' in item) && (isWebpSupported) && (<CardMedia alt={item.name} component="img" style={{objectFit: 'cover', padding:10 }} image={item.image.web}/>)}
                                    {('image' in item) && (!isWebpSupported) && (<CardMedia alt={item.name} component="img" style={{objectFit: 'cover', padding:10 }} image={item.image.raw}/>)}
                                    <CardHeader style={{ backgroundColor:'#eeeeee', paddingTop:'5px', paddingBottom:'5px', paddingLeft:'5px', paddingRight:'5px', textAlign:'center'}} titleTypographyProps={{ color:theme.palette.primary.main, fontSize:'14px', fontWeight:'bold', fontFamily:item.font }} title={item.name} />
                                    <CardContent style={{ backgroundColor:'#eeeeee', padding:'5px' }}>
                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px', fontStyle:'italic', paddingBottom:'10px' }}>"{item.description}"</Typography>
                                        <Grid container columns={2} spacing={1}>
                                            <Grid item xs={1}>
                                                <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Member : </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Paper style={{ backgroundColor:year_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {year_start} - { year_stop!==0?year_stop:""} </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Grade : </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Paper style={{ backgroundColor:grade_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.grade} </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Coding : </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Paper style={{ backgroundColor:coding_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.coding} </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Building : </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Paper style={{ backgroundColor:building_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.building} </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )

                    })}
                </Grid>
            </Container>
            <Container style={{ width:'100%', overflowX: 'hidden', overflowY: 'hidden' }}>
                <Typography variant="h1">Our alumni</Typography>
                <Grid container columns={24}>
                    { localAlumni.map((item, index) => { /* Loop on all member to create entries */


                        const coding_color = '#84cd54'
                        const building_color = '#859780'
                        const year_color = '#3ded97'

                        var time = new Date(1970, 0, 1); // Epoch
                        time.setSeconds(item.start.seconds);
                        const year_start = time.getYear() + 1900;
                        let year_stop = 0
                        if ('end' in item ) {

                            time = new Date(1970, 0, 1)
                            time.setSeconds(item.end.seconds);
                            year_stop = time.getYear() + 1900;

                        }


                        return(
                            <Grid item xs={24} sm={12} md={8} lg={6} key={item.id} style={{padding:0}}>
                                <Card elevation={4} style={{ backgroundColor:'#eeeeee', margin:10 }}>
                                    {('image' in item) && (isWebpSupported) && (<CardMedia alt={item.name} component="img" style={{objectFit: 'cover', padding:10 }} image={item.image.web}/>)}
                                    {('image' in item) && (!isWebpSupported) && (<CardMedia alt={item.name} component="img" style={{objectFit: 'cover', padding:10 }} image={item.image.raw}/>)}
                                    <CardHeader style={{ backgroundColor:'#eeeeee', paddingTop:'5px', paddingBottom:'5px', paddingLeft:'5px', paddingRight:'5px', textAlign:'center'}} titleTypographyProps={{ color:theme.palette.primary.main, fontSize:'14px', fontWeight:'bold', fontFamily:item.font }} title={item.name} />
                                    <CardContent style={{ backgroundColor:'#eeeeee', padding:'5px' }}>
                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px', fontStyle:'italic' }}>"{item.description}"</Typography>
                                        <Grid container columns={2} spacing={1}>
                                            <Grid item xs={1}>
                                                <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Member : </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Paper style={{ backgroundColor:year_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {year_start} - { year_stop!==0?year_stop:""} </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Coding : </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Paper style={{ backgroundColor:coding_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.coding} </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Building : </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Paper style={{ backgroundColor:building_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.building} </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>

                                    </CardContent>
                                </Card>
                            </Grid>
                        )

                    })}
                </Grid>
            </Container>
        </Profiler>
    );

}


export default Team;