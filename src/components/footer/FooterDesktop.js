/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Footer component for desktop display
# -------------------------------------------------------
# Nadège LEMPERIERE, @26 may 2023
# Latest revision: 28 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Fragment }                                          from 'react';

/* Material includes */
import { Typography, Grid, Link, Divider, Tooltip, Stack }   from '@mui/material';
import { default as LocationOn }                             from '@mui/icons-material/LocationOn';
import { default as Email }                                  from '@mui/icons-material/Email';
import { default as YouTube }                                from '@mui/icons-material/YouTube';
import { GitHub }                                            from '@mui/icons-material';
import { default as Instagram }                              from '@mui/icons-material/Instagram';
import { default as Facebook }                               from '@mui/icons-material/Facebook';
import { default as Policy }                                 from '@mui/icons-material/Policy';
import { default as Gavel }                                  from '@mui/icons-material/Gavel';
import { useTheme }                                          from '@mui/material/styles';

/* Portal includes */
import { ReactComponent as HudsonIcon }                      from '../../assets/icons/hudson.svg';
import { ReactComponent as FllIcon }                         from '../../assets/icons/fll.svg';
import { ReactComponent as FasnyIcon }                       from '../../assets/icons/fasny.svg';
import { ReactComponent as SharkbotsIcon }                   from '../../assets/icons/sharkbots.svg';

/* Local includes */
import FooterLink                                            from './FooterLink';

function FooterDesktop(props) {

    /* --------- Gather inputs --------- */
    const theme = useTheme();
    //const componentName = 'FooterDesktop';

    /* -------- Defining theme --------- */
    const main_color = theme.palette.primary.main;
    const background_color = theme.palette.common.white;

    /* ----------- Define HTML --------- */
    /* eslint-disable padded-blocks */
    return (
        <Fragment>
            <Divider style={{ color:main_color, borderColor:main_color, width:'100%' }}/>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} style={{ width:'100%', padding:5 }}>
                <Typography style={{ textTransform:'uppercase', color:main_color, textAlign:'left', fontSize:'14px', fontWeight:'bold' }}>
                    Follow us:
                </Typography>
                <Tooltip title="GBR on YouTube">
                    <FooterLink href="https://www.youtube.com/channel/UC-sG91KPJL1uP7vpQwxXKhg" target="_blank" col={main_color}>
                        <YouTube style={{ backgroundColor:'rgba(255,255,255,0)', color:background_color, padding:2, height:'20px' }}/>
                    </FooterLink>
                </Tooltip>
                <Tooltip title="GBR on Github">
                    <FooterLink href="https://www.youtube.com/channel/UC-sG91KPJL1uP7vpQwxXKhg" target="_blank" col={main_color}>
                        <GitHub style={{ backgroundColor:'rgba(255,255,255,0)', color:background_color, padding:2, height:'20px' }}/>
                    </FooterLink>
                </Tooltip>
                <Tooltip title="GBR on Facebook">
                    <FooterLink href="https://www.youtube.com/channel/UC-sG91KPJL1uP7vpQwxXKhg" target="_blank" col={main_color}>
                        <Facebook style={{ backgroundColor:'rgba(255,255,255,0)', color:background_color, padding:2, height:'20px' }}/>
                    </FooterLink>
                </Tooltip>
                <Tooltip title="GBR on Instagram">
                    <FooterLink href="https://www.youtube.com/channel/UC-sG91KPJL1uP7vpQwxXKhg" target="_blank" col={main_color}>
                        <Instagram style={{ backgroundColor:'rgba(255,255,255,0)', color:background_color, padding:2, height:'20px' }}/>
                    </FooterLink>
                </Tooltip>
            </Stack>
            <Divider style={{ color:main_color, borderColor:main_color, width:'100%' }}/>
            <Grid container style={{ paddingTop: 5 }}>
                <Grid item xs={6} style={{ paddingBottom:5 }}>
                    <Typography style={{ textTransform:'uppercase', color:main_color, textAlign:'left', fontSize:'14px', fontWeight:'bold', textDecoration:'underline' }}>
                        About us
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{ paddingBottom:5 }}>
                    <Typography style={{ textTransform:'uppercase', color:main_color, textAlign:'left', fontSize:'14px', fontWeight:'bold', textDecoration:'underline' }}>
                        Resources
                    </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign:'center', paddingTop:'2px', height:'20px' }}>
                    <Link href="https://www.google.com/maps/place/145+New+St,+Mamaroneck,+NY+10543/@40.9574836,-73.7427351,17z/data=!3m1!4b1!4m6!3m5!1s0x89c29178999a22ed:0xf8e5945ae9a93104!8m2!3d40.9574796!4d-73.7401548!16s%2Fg%2F11bw503qfd?entry=ttu" target="_blank">
                        <LocationOn style={{ color:main_color, height:'20px' }}/>
                    </Link>
                </Grid>
                <Grid item xs={5} style={{ paddingTop:'5px', height:'20px' }}>
                    <Link underline="none" href="https://www.google.com/maps/place/145+New+St,+Mamaroneck,+NY+10543/@40.9574836,-73.7427351,17z/data=!3m1!4b1!4m6!3m5!1s0x89c29178999a22ed:0xf8e5945ae9a93104!8m2!3d40.9574796!4d-73.7401548!16s%2Fg%2F11bw503qfd?entry=ttu" target="_blank">
                        <Typography style={{ color:main_color, fontSize:'11px' }}>
                            145 New Street - Mamaroneck, NY 10543
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={1} style={{ textAlign:'center', paddingTop:'2px', height:'20px' }} >
                    <Link href="https://www.firstlegoleague.org/" target="_blank">
                        <FllIcon fill={main_color} style={{ color:main_color, height:'20px' }}/>
                    </Link>
                </Grid>
                <Grid item xs={5} style={{ paddingTop:'5px', height:'20px' }}>
                    <Link href="https://www.firstlegoleague.org/" target="_blank" underline="none">
                        <Typography style={{ color:main_color, fontSize:'11px' }}>
                            First Lego League
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={1} style={{ textAlign:'center', paddingTop:'2px', height:'20px' }}>
                    <Link href="mailto:green.brick.road.first@gmail.com">
                        <Email style={{ color:main_color, height:'20px'}}/>
                    </Link>
                </Grid>
                <Grid item xs={5} style={{ paddingTop:'6px', height:'20px' }}>
                    <Link href="mailto:green.brick.road..first@gmail.com" underline="none">
                        <Typography style={{ color:main_color, fontSize:'11px' }}>
                            green.brick.road.first@gmail.com
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={1}  style={{ textAlign:'center', paddingTop:'2px', height:'20px' }}>
                    <Link href="https://www.fasny.org/" target="_blank">
                        <FasnyIcon fill={main_color} style={{ height:'20px' }}/>
                    </Link>
                </Grid>
                <Grid item xs={5} style={{ paddingTop:'6px', height:'20px' }}>
                    <Link href="https://www.fasny.org/" target="_blank" underline="none">
                        <Typography style={{ color:main_color, fontSize:'11px' }}>
                            French American School of New York
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={1} style={{ textAlign:'center', paddingTop:'2px', height:'20px' }}>
                    <Link href="/policy" underline="none">
                        <Policy style={{ color:main_color, height:'20px' }}/>
                    </Link>
                </Grid>
                <Grid item xs={5} style={{ paddingTop:'6px', height:'20px' }}>
                    <Link href="/policy" underline="none">
                        <Typography style={{ color:main_color, fontSize:'11px' }}>
                            Privacy policy
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={1} style={{ textAlign:'center', paddingTop:'2px', height:'20px' }}>
                    <Link href="https://www.sharkbots.org/" target="_blank">
                        <SharkbotsIcon fill={main_color} style={{ height:'20px' }}/>
                    </Link>
                </Grid>
                <Grid item xs={5} style={{ paddingTop:'6px', height:'20px' }}>
                    <Link href="https://www.sharkbots.org/" target="_blank" underline="none">
                        <Typography style={{ color:main_color, fontSize:'11px' }}>
                            Our big brothers & sisters from FTC team
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={1} style={{ textAlign:'center', paddingTop:'2px', height:'20px'  }}>
                    <Link href="/terms" underline="none">
                        <Gavel style={{ color:main_color, height:'20px' }}/>
                    </Link>
                </Grid>
                <Grid item xs={5} style={{ paddingTop:'6px', height:'20px' }}>
                    <Link href="/terms" underline="none">
                        <Typography style={{ color:main_color, fontSize:'11px' }}> Terms & Conditions</Typography>
                    </Link>
                </Grid>
                <Grid item xs={1} style={{ textAlign:'center', paddingTop:'2px', height:'20px'  }}>
                    <Link href="https://sites.google.com/site/hudsonvalleyfirstlegoleague/" target="_blank">
                        <HudsonIcon fill={main_color} style={{ height:'20px' }}/>
                    </Link>
                </Grid>
                <Grid item xs={5} style={{ paddingTop:'6px', height:'20px' }}>
                    <Link href="https://sites.google.com/site/hudsonvalleyfirstlegoleague/" target="_blank" underline="none">
                        <Typography style={{ color:main_color, fontSize:'11px' }}>
                            Our regional First Lego League
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Divider style={{ color:main_color, borderColor:main_color, width:'100%', paddingTop:5 }}/>
            <Stack direction="row" justifyContent='space-between' alignItems='center' style={{ paddingTop:'5px' }}>
                <Typography style={{ color:main_color, fontSize:'11px' }}> THE GREEN BRICK ROAD Copyright © 2023 The Green Brick Road - All rights reserved </Typography>
                <Typography style={{ color:main_color, fontSize:'11px', textAlign:'right' }}> {process.env.REACT_APP_VERSION}</Typography>
            </Stack>
        </Fragment>
    );
    /* eslint-enable padded-blocks */

}

export default FooterDesktop;
