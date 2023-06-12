/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# RobotGallery page definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @07 june 2023
# Latest revision: 08 june 2023
# ---------------------------------------------------- */

/* React includes */
import { useEffect, Fragment, useState }                                  from 'react';

/* Material UI includes */
import { Card, CardContent, CardMedia, CardHeader, Container }            from '@mui/material';
import { Grid, Typography, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { Checkbox, Stack, Divider }                                       from '@mui/material';
import { default as CheckBox }                                            from '@mui/icons-material/CheckBox';
import { default as CheckBoxOutlineBlank }                                from '@mui/icons-material/CheckBoxOutlineBlank';
import { useTheme }                                                       from '@mui/material/styles';

/* Portal includes */
import { useData, useLogging }                                            from '../../providers';
import { Image }                                                          from '../../components'

function RobotGallery() {

    /* --------- Gather inputs --------- */
    const { seasons, robots }                     = useData();
    const { logText }                             = useLogging();
    const theme                                   = useTheme();
    const [ localRobots, setLocalRobots ]         = useState([])
    const [ localSeasons, setLocalSeasons ]       = useState([])
    const [ localTypes, setLocalTypes ]           = useState([])
    const [ selectedSeasons, setSelectedSeasons ] = useState({})
    const [ selectedTypes, setSelectedTypes ]     = useState({})
    const componentName = 'RobotGallery'


    /* ------- Preprocess robots ------- */
    useEffect(() => {

        const local_robots = [];
        const local_types = [];
        const local_seasons = [];
        const selected_seasons = {};
        const selected_types = {};

        for (let i_season = 0; i_season < seasons.length; i_season +=1) {

            const local_season = JSON.parse(JSON.stringify(seasons[i_season]))
            local_season.robots = []

            for (let i_robot = 0; i_robot < robots.length; i_robot += 1) {

                if (robots[i_robot].season === local_season.id) {

                    if (local_season.robots.length === 0) { local_season.robots.push(robots[i_robot]); }
                    else {

                        let j_robot = 0
                        if(robots[i_robot].id > local_season.robots[local_season.robots.length - 1].id) { local_season.robots.push(robots[i_robot]); }
                        else {

                            while((robots[i_robot].id > local_season.robots[j_robot].id) && ((j_robot + 1) < local_season.robots.length)) { j_robot += 1 }
                            local_season.robots.splice(j_robot, 0, robots[i_robot]);

                        }

                    }

                }

            }

            if (local_seasons.length === 0) { local_seasons.push(local_season); }
            else {

                let j_season = 0
                if(local_season.start.seconds > local_seasons[local_seasons.length - 1].start.seconds) { local_seasons.push(local_season);}
                else {

                    while((local_season.start.seconds > local_seasons[j_season].start.seconds) && ((j_season + 1) < local_seasons.length)) { j_season += 1 }
                    local_seasons.splice(j_season, 0, local_season);

                }

            }

            selected_seasons[local_season.name] = true

        }
        setLocalSeasons(local_seasons)
        setSelectedSeasons(selected_seasons)

        for (let i_season = 0; i_season < local_seasons.length; i_season += 1) {

            for (let i_robot = 0; i_robot < local_seasons[i_season].robots.length; i_robot += 1) {

                const local_robot = JSON.parse(JSON.stringify(local_seasons[i_season].robots[i_robot]))
                local_robot.season = local_seasons[i_season]
                local_robots.push(local_robot)

                if (local_types.indexOf(local_robot.type) < 0) {

                    local_types.push(local_robot.type)
                    selected_types[local_robot.type] = true

                }

            }

        }
        setLocalRobots(local_robots)
        setLocalTypes(local_types)
        setSelectedTypes(selected_types)

    }, [seasons, robots]);

    /* Filters management functions */
    const handleSeasonChange = (event) => {

        logText(componentName, 'log', 'workflow', ' handleSeasonChange --- BEGIN');
        const local_select = JSON.parse(JSON.stringify(selectedSeasons))
        local_select[event.target.id] = !(local_select[event.target.id])
        setSelectedSeasons(local_select)

    };
    const handleTypeChange = (event) => {

        logText(componentName, 'log', 'workflow', ' handleTypeChange --- BEGIN');
        const local_select = JSON.parse(JSON.stringify(selectedTypes))
        local_select[event.target.id] = !(local_select[event.target.id])
        setSelectedTypes(local_select)

    };


    /* ----------- Define HTML --------- */
    return (
        <Fragment>
            <Container style={{ width:'100%', padding:0, position:'relative' }}>
                <Image name="robots" style={{ width:'100%', pointerEvents: 'none' }}/>
            </Container>
            <Container style={{ fontSize:'14px', paddingTop:'20px', paddingBottom:'20px' }}>
                <Typography variant="h1">Journey of Engineering: Meet GBR Robots</Typography>
                <Typography variant="body2" style={{ fontSize:'14px', paddingTop:10, textAlign:'justify' }}> In our quest for innovation, we understand that greatness often lies in simplicity. Our focus is not on building the most complicated robots, but the most effective and reliable ones.</Typography>
                <Typography variant="body2" style={{ fontSize:'14px', paddingTop:10, textAlign:'justify' }}> Our journey began 2 years ago, with the development of a compact and stable robot base. This ingenious cornerstone was designed with a unique feature – it was extendable by attachments. This seemingly small innovation was a breakthrough for us, serving as the fundamental building block of our creations. It not only elevated the performance of our robots but also allowed us the flexibility to explore and innovate without the constant need to reinvent the base.</Typography>
                <Typography variant="body2" style={{ fontSize:'14px', paddingTop:10, textAlign:'justify' }}> Building upon this solid foundation, our second year witnessed an exponential leap in creativity and technological sophistication. As we developed complex attachments, we saw our robots transform, taking on new capabilities, enhancing their functionality, and expanding their horizons.</Typography>
                <Typography variant="body2" style={{ fontSize:'14px', paddingTop:10, textAlign:'justify' }}> As you journey with us through this gallery of our robotic achievements, you'll witness the progressive evolution of our work. We invite you to explore, engage, and be inspired by our robotic adventures. </Typography>
                <Typography variant="body2" style={{ fontSize:'14px', paddingTop:10, textAlign:'justify', fontWeight:'bold' }}> Take a deep breath and dive into our engineering world!</Typography>
            </Container>
            <Container style={{ width:'100%'}}>
                <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%', paddingTop:5 }}/>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell style={{border:'none', padding:2}}>
                                <Typography variant="body2" style={{ fontSize:'11px' }}> SEASONS : </Typography>
                            </TableCell>
                            { localSeasons.map((item, index) => { /* Loop on all seasons to create checkboxes */

                                const checked = (selectedSeasons[item.name])
                                return(

                                    <TableCell style={{border:'none', padding:2}} key={item.name}>
                                        <Stack direction="row" alignItems="center">
                                            <Checkbox
                                                size="small" id={item.name} style={{ padding:'2px' }}
                                                checked={checked} onChange={handleSeasonChange}
                                                inputProps={{'aria-label': item.name}}
                                                checkedIcon={<CheckBox style={{color:theme.palette.primary.main}}/>}
                                                icon={<CheckBoxOutlineBlank style={{color:theme.palette.primary.main}}/>}/>
                                            <Typography variant="body2" style={{ fontSize:'11px' }}> {item.name} </Typography>
                                        </Stack>
                                    </TableCell>

                                )

                            })}
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border:'none', padding:2}}>
                                <Typography variant="body2" style={{ fontSize:'11px' }}> TYPES : </Typography>
                            </TableCell>
                            { localTypes.map((item, index) => { /* Loop on all seasons to create checkboxes */

                                const checked = (selectedTypes[item])
                                return(

                                    <TableCell key={item} style={{border:'none', padding:2}}>
                                        <Stack direction="row" alignItems="center">
                                            <Checkbox
                                                size="small" id={item} style={{ padding:'2px' }}
                                                checked={checked} onChange={handleTypeChange}
                                                inputProps={{'aria-label': item}}
                                                checkedIcon={<CheckBox style={{color:theme.palette.primary.main}}/>}
                                                icon={<CheckBoxOutlineBlank style={{color:theme.palette.primary.main}}/>}/>
                                            <Typography variant="body2" style={{ fontSize:'11px' }}> {item} </Typography>
                                        </Stack>
                                    </TableCell>
                                )

                            })}

                        </TableRow>
                    </TableBody>
                </Table>
                <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%'  }}/>
            </Container>
            <Container style={{ width:'100%', overflowX: 'hidden', overflowY: 'hidden' }}>
                <Grid container columns={60}>
                    { localRobots.map((item, index) => { /* Loop on all robots to create entries */

                        //const url = `/robots/${item.id}`
                        const type_color = '#84cd54'
                        const season_color = '#859780'

                        /*<Link href={url} underline="none"><Card></Card></Link>*/

                        return(
                            <Fragment key={item.id}>
                                {(selectedSeasons[item.season.name]) && (selectedTypes[item.type]) && (
                                    <Grid item xs={30} sm={20} md={15} lg={12}  style={{padding:0}}>
                                        <Card elevation={4} style={{ backgroundColor:'#eeeeee', margin:10 }}>
                                            <CardHeader style={{ backgroundColor:'#eeeeee', paddingTop:'5px', paddingBottom:'5px', paddingLeft:'5px', paddingRight:'5px', textAlign:'center'}} titleTypographyProps={{ color:theme.palette.primary.main, fontSize:'14px', fontWeight:'bold', fontFamily:item.font }} title={item.name} />
                                            <CardContent style={{ backgroundColor:'#eeeeee', padding:'5px' }}>
                                                <Table size="small" >
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell style={{border:'none', padding:2}}>
                                                                <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'11px' }}> Type : </Typography>
                                                            </TableCell>
                                                            <TableCell style={{border:'none', padding:2}}>
                                                                <Paper style={{ backgroundColor:type_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'11px', fontWeight:'bold', textAlign:'center'}}> {item.type} </Typography>
                                                                </Paper>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell style={{border:'none', padding:2}}>
                                                                <Typography variant="body1" style={{ color:theme.palette.common.black, fontSize:'11px' }}> Season : </Typography>
                                                            </TableCell>
                                                            <TableCell style={{border:'none', padding:2}}>
                                                                <Paper style={{ backgroundColor:season_color, paddingLeft:'5px', paddingRight:'5px' }} >
                                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'11px', fontWeight:'bold', textAlign:'center'}}> {item.season.name} </Typography>
                                                                </Paper>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                            <CardMedia component="img" style={{objectFit: 'cover' }} image={item.image}/>
                                        </Card>
                                    </Grid>
                                )}
                            </Fragment>
                        )

                    })}
                </Grid>
            </Container>
        </Fragment>

    )

}

export default RobotGallery;