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

/* Material includes */
import { Typography, Grid, Link, Divider, Tooltip, Stack, Container }             from '@mui/material';
import { LocationOn, Email, YouTube, GitHub, Instagram, Facebook, Policy, Gavel } from '@mui/icons-material';
import { useTheme }                                                               from '@mui/material/styles';

/* Portal includes */
import { Image }                                                                  from '../../components';

/* Local includes */
import FooterAvatar from './FooterAvatar';

function FooterDesktop() {

    /* --------- Gather inputs --------- */
    const theme = useTheme();
    //const componentName = 'FooterDesktop';

    /* ----------- Define HTML --------- */
    /* eslint-disable padded-blocks */
    return (
        <Container style={{ backgroundColor: 'rgba(255,255,255,0)', padding:0 }}>
            <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%' }}/>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} style={{ width:'100%', padding:10 }}>
                <Typography style={{ textTransform:'uppercase', color:theme.palette.primary.main, textAlign:'left', fontSize:'11px', fontWeight:'bold' }}>
                    Follow us:
                </Typography>
                <Tooltip title="GBR on YouTube">
                    <Link href="https://www.youtube.com/channel/UC-sG91KPJL1uP7vpQwxXKhg" target="_blank">
                        <FooterAvatar variant="circle" col={theme.palette.primary.main} ><YouTube style={{ backgroundColor:theme.palette.primary.main, color:theme.palette.common.white, padding:2 }}/></FooterAvatar>
                    </Link>
                </Tooltip>
                <Tooltip title="GBR on Github">
                    <Link href="https://github.com/the-green-brick-road/" target="_blank">
                        <FooterAvatar variant="circle" col={theme.palette.primary.main}><GitHub style={{ backgroundColor:theme.palette.primary.main, color:theme.palette.common.white, padding:2 }}/></FooterAvatar>
                    </Link>
                </Tooltip>
                <Tooltip title="GBR on Facebook">
                    <Link href="https://www.facebook.com/100093250563007/" target="_blank">
                        <FooterAvatar variant="circle" col={theme.palette.primary.main}><Facebook style={{ backgroundColor:theme.palette.primary.main, color:theme.palette.common.white, padding:2 }}/></FooterAvatar>
                    </Link>
                </Tooltip>
                <Tooltip title="GBR on Instagram">
                    <Link href="https://www.instagram.com/the.green.brick.road/" target="_blank">
                        <FooterAvatar variant="circle" col={theme.palette.primary.main}><Instagram style={{ backgroundColor:theme.palette.primary.main, color:theme.palette.common.white, padding:2 }}/></FooterAvatar>
                    </Link>
                </Tooltip>
            </Stack>
            <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%' }}/>
            <Grid container xs={12} style={{ paddingTop:'10px' }}>
                <Grid container xs={12} style={{ paddingBottom:10 }}>
                    <Grid item xs={6} >
                        <Typography style={{ textTransform:'uppercase', color:theme.palette.primary.main, textAlign:'left', fontSize:'11px', fontWeight:'bold', textDecoration:'underline' }}>
                            About us
                        </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <Typography style={{ textTransform:'uppercase', color:theme.palette.primary.main, textAlign:'left', fontSize:'11px', fontWeight:'bold', textDecoration:'underline' }}>
                            Resources
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container xs={12} style={{ paddingTop:'2px' }}>
                    <Grid item xs={1} style={{ textAlign:'center' }}>
                        <Link href="https://www.google.com/maps/place/145+New+St,+Mamaroneck,+NY+10543/@40.9574836,-73.7427351,17z/data=!3m1!4b1!4m6!3m5!1s0x89c29178999a22ed:0xf8e5945ae9a93104!8m2!3d40.9574796!4d-73.7401548!16s%2Fg%2F11bw503qfd?entry=ttu" target="_blank">
                            <LocationOn style={{ color:theme.palette.primary.main, height:'24px' }}/>
                        </Link>
                    </Grid>
                    <Grid item xs={5} style={{ paddingTop:'4px' }}>
                        <Link underline="none" href="https://www.google.com/maps/place/145+New+St,+Mamaroneck,+NY+10543/@40.9574836,-73.7427351,17z/data=!3m1!4b1!4m6!3m5!1s0x89c29178999a22ed:0xf8e5945ae9a93104!8m2!3d40.9574796!4d-73.7401548!16s%2Fg%2F11bw503qfd?entry=ttu" target="_blank">
                            <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}>
                                145 New Street - Mamaroneck, NY 10543
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign:'center' }} >
                        <Link href="https://www.firstlegoleague.org/" target="_blank">
                            <Image name="fll" style={{ margin:0, height:'24px' }}/>
                        </Link>
                    </Grid>
                    <Grid item xs={5} style={{ paddingTop:'4px' }}>
                        <Link href="https://www.firstlegoleague.org/" target="_blank" underline="none">
                            <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}>
                                First Lego League
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container xs={12} style={{ paddingTop:'2px' }}>
                    <Grid item xs={1} style={{ textAlign:'center' }}>
                        <Link href="mailto:green.brick.road.first@gmail.com">
                            <Email style={{ color:theme.palette.primary.main, height:'24px'}}/>
                        </Link>
                    </Grid>
                    <Grid item xs={5} style={{ paddingTop:'4px' }}>
                        <Link href="mailto:contact.technogix@gmail.com" underline="none">
                            <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}>
                                green.brick.road.first@gmail.com
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={1}  style={{ textAlign:'center' }}>
                        <Link href="https://www.fasny.org/" target="_blank">
                            <Image name="fasny" style={{ height:'24px' }}/>
                        </Link>
                    </Grid>
                    <Grid item xs={5} style={{ paddingTop:'4px' }}>
                        <Link href="https://www.fasny.org/" target="_blank" underline="none">
                            <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}>
                                French American School of New York
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container xs={12} style={{ paddingTop:'2px' }}>
                    <Grid item xs={1} style={{ textAlign:'center' }}>
                        <Policy style={{ color:theme.palette.primary.main, height:'24px' }}/>
                    </Grid>
                    <Grid item xs={5} style={{ paddingTop:'4px' }}>
                        <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}>
                            Privacy policy
                        </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign:'center' }}>
                        <Link href="https://www.sharkbots.org/" target="_blank">
                            <Image name="sharkbots" style={{ height:'24px' }}/>
                        </Link>
                    </Grid>
                    <Grid item xs={5} style={{ paddingTop:'4px' }}>
                        <Link href="https://www.sharkbots.org/" target="_blank" underline="none">
                            <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}>
                                Our big brothers & sisters from FTC team
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container xs={12} style={{ paddingTop:'2px' }}>
                    <Grid item xs={1} style={{ textAlign:'center' }}>
                        <Gavel style={{ color:theme.palette.primary.main, height:'24px' }}/>
                    </Grid>
                    <Grid item xs={5} style={{ paddingTop:'4px' }}>
                        <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}> Terms & Conditions</Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign:'center' }}>
                        <Link href="https://sites.google.com/site/hudsonvalleyfirstlegoleague/" target="_blank">
                            <Image name="hudson" style={{ height:'24px' }}/>
                        </Link>
                    </Grid>
                    <Grid item xs={5} style={{ paddingTop:'4px' }}>
                        <Link href="https://sites.google.com/site/hudsonvalleyfirstlegoleague/" target="_blank" underline="none">
                            <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}>
                                Our regional First Lego League
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%', paddingTop:10 }}/>
            <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}> THE GREEN BRICK ROAD Copyright © 2023 The Green Brick Road - All rights reserved </Typography>
        </Container>
    );
    /* eslint-enable padded-blocks */

}

export default FooterDesktop;
