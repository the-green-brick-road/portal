/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Footer component for mobile display
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} style={{ width:'100%', paddingTop:10, paddingLeft:0, paddingRight:0, paddingBottom:10 }}>
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
            <Grid container xs={12} md={6}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} style={{ width:'100%', paddingTop:10, paddingLeft:0, paddingRight:0 }}>
                    <Typography style={{ textTransform:'uppercase', color:theme.palette.primary.main, textAlign:'left', fontSize:'11px', fontWeight:'bold' }}>
                        About us :
                    </Typography>
                    <Tooltip title="145 New Street - Mamaroneck, NY 10543">
                        <Link href="https://www.google.com/maps/place/145+New+St,+Mamaroneck,+NY+10543/@40.9574836,-73.7427351,17z/data=!3m1!4b1!4m6!3m5!1s0x89c29178999a22ed:0xf8e5945ae9a93104!8m2!3d40.9574796!4d-73.7401548!16s%2Fg%2F11bw503qfd?entry=ttu" target="_blank">
                            <LocationOn style={{ color:theme.palette.primary.main, height:'24px' }}/>
                        </Link>
                    </Tooltip>
                    <Tooltip title="green.brick.road.first@gmail.com">
                        <Link href="mailto:green.brick.road.first@gmail.com">
                            <Email style={{ color:theme.palette.primary.main, height:'24px'}}/>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Privacy policy">
                        <Policy style={{ color:theme.palette.primary.main, height:'24px' }}/>
                    </Tooltip>
                    <Tooltip title="Terms & Conditions">
                        <Gavel style={{ color:theme.palette.primary.main, height:'24px' }}/>
                    </Tooltip>

                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} style={{ width:'100%', paddingBottom:10, paddingTop:10 }}>
                    <Typography style={{ textTransform:'uppercase', color:theme.palette.primary.main, textAlign:'left', fontSize:'11px', fontWeight:'bold' }}>
                        Resources :
                    </Typography>
                    <Tooltip title="First Lego League">
                        <Link href="https://www.firstlegoleague.org/" target="_blank">
                            <Image name="fll" style={{ margin:0, height:'24px' }}/>
                        </Link>
                    </Tooltip>
                    <Tooltip title="French American School of New York">
                        <Link href="https://www.fasny.org/" target="_blank">
                            <Image name="fasny" style={{ height:'24px' }}/>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Our big brothers & sisters from FTC team">
                        <Link href="https://www.sharkbots.org/" target="_blank">
                            <Image name="sharkbots" style={{ margin:0, height:'24px' }}/>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Our regional First Lego League">
                        <Link href="https://sites.google.com/site/hudsonvalleyfirstlegoleague/" target="_blank">
                            <Image name="hudson" style={{ height:'24px' }}/>
                        </Link>
                    </Tooltip>
                </Stack>
            </Grid>
            <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%' }}/>
            <Typography style={{ color:theme.palette.primary.main, fontSize:'10px' }}> THE GREEN BRICK ROAD Copyright © 2023 The Green Brick Road - All rights reserved </Typography>
        </Container>
    );
    /* eslint-enable padded-blocks */

}

export default FooterDesktop;
