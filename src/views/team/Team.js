
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
import { useEffect, Fragment, useState }                                  from 'react';

/* Material UI includes */
import { Card, CardContent, CardMedia, CardHeader, Container }            from '@mui/material';
import { Grid, Typography, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useTheme }                                                       from '@mui/material/styles';

/* Portal includes */
import { useData }                                                        from '../../providers';
import { Image }                                                          from '../../components'

function Team() {

    /* --------- Gather inputs --------- */
    const { team }                                = useData();
    const theme                                   = useTheme();
    const [ localTeam, setLocalTeam ]             = useState([])
    const [ localAlumni, setLocalAlumni ]         = useState([])
    //const componentName = 'Team'


    /* ------- Preprocess members ------- */
    useEffect(() => {

        const local_team = [];
        const local_alumni = [];

        for (let i_member = 0; i_member < team.length; i_member +=1) {

            if (team[i_member].grade !== -1) {

                if (local_team.length === 0) { local_team.push(team[i_member]); }
                else {

                    let j_member = 0
                    if(team[i_member].grade < local_team[local_team.length - 1].grade) { local_team.push(team[i_member]); }
                    else if ((team[i_member].grade === local_team[local_team.length - 1].grade) && (team[i_member].name > local_team[local_team.length - 1].name)) { local_team.push(team[i_member]); }
                    else {

                        while((team[i_member].grade < local_team[j_member].grade) && ((j_member + 1) < local_team.length)) { j_member += 1 }
                        while((team[i_member].grade === local_team[j_member].grade) && (team[i_member].name > local_team[j_member].name) && ((j_member + 1) < local_team.length)) { j_member += 1 }
                        local_team.splice(j_member, 0, team[i_member]);

                    }

                }

            }
            else {

                if (local_alumni.length === 0) { local_alumni.push(team[i_member]); }
                else {

                    let j_member = 0
                    if(team[i_member].end.seconds < local_alumni[local_alumni.length - 1].end.seconds) { local_alumni.push(team[i_member]); }
                    else if ((team[i_member].end.seconds === local_alumni[local_alumni.length - 1].end.seconds) && (team[i_member].name > local_alumni[local_alumni.length - 1].name)) { local_alumni.push(team[i_member]); }
                    else {

                        while((team[i_member].end.seconds < local_alumni[j_member].end.seconds) && ((j_member + 1) < local_alumni.length)) { j_member += 1 }
                        while((team[i_member].end.seconds === local_alumni[j_member].end.seconds) && (team[i_member].name > local_alumni[j_member].name) && ((j_member + 1) < local_alumni.length)) { j_member += 1 }
                        local_alumni.splice(j_member, 0, team[i_member]);

                    }

                }

            }

        }
        setLocalTeam(local_team)
        setLocalAlumni(local_alumni)

    }, [team]);


    /* ----------- Define HTML --------- */
    return (
        <Fragment>
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
                                    {('image' in item) && (<CardMedia component="img" style={{objectFit: 'cover', padding:10 }} image={item.image}/>)}
                                    <CardHeader style={{ backgroundColor:'#eeeeee', paddingTop:'5px', paddingBottom:'5px', paddingLeft:'5px', paddingRight:'5px', textAlign:'center'}} titleTypographyProps={{ color:theme.palette.primary.main, fontSize:'14px', fontWeight:'bold', fontFamily:item.font }} title={item.name} />
                                    <CardContent style={{ backgroundColor:'#eeeeee', padding:'5px' }}>
                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px', fontStyle:'italic' }}>"{item.description}"</Typography>
                                        <Table size="small" style={{marginTop:'10px'}}>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Member : </Typography>
                                                    </TableCell>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Paper style={{ backgroundColor:year_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                            <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {year_start} - { year_stop!==0?year_stop:""} </Typography>
                                                        </Paper>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Grade : </Typography>
                                                    </TableCell>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Paper style={{ backgroundColor:grade_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                            <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.grade} </Typography>
                                                        </Paper>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Coding : </Typography>
                                                    </TableCell>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Paper style={{ backgroundColor:coding_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                            <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.coding} </Typography>
                                                        </Paper>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Building : </Typography>
                                                    </TableCell>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Paper style={{ backgroundColor:building_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                            <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.building} </Typography>
                                                        </Paper>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
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
                                    {('image' in item) && (<CardMedia component="img" style={{objectFit: 'cover', padding:10 }} image={item.image}/>)}
                                    <CardHeader style={{ backgroundColor:'#eeeeee', paddingTop:'5px', paddingBottom:'5px', paddingLeft:'5px', paddingRight:'5px', textAlign:'center'}} titleTypographyProps={{ color:theme.palette.primary.main, fontSize:'14px', fontWeight:'bold', fontFamily:item.font }} title={item.name} />
                                    <CardContent style={{ backgroundColor:'#eeeeee', padding:'5px' }}>
                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px', fontStyle:'italic' }}>"{item.description}"</Typography>
                                        <Table size="small" style={{marginTop:'10px'}}>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Member : </Typography>
                                                    </TableCell>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Paper style={{ backgroundColor:year_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                            <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {year_start} - { year_stop!==0?year_stop:""} </Typography>
                                                        </Paper>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Coding : </Typography>
                                                    </TableCell>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Paper style={{ backgroundColor:coding_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                            <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.coding} </Typography>
                                                        </Paper>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'14px' }}> Building : </Typography>
                                                    </TableCell>
                                                    <TableCell style={{border:'none', padding:2}}>
                                                        <Paper style={{ backgroundColor:building_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                            <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'14px', fontWeight:'bold', textAlign:'center'}}> {item.building} </Typography>
                                                        </Paper>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )

                    })}
                </Grid>
            </Container>
        </Fragment>
    );

}


export default Team;