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
import { Typography, Grid, Link, Divider, Tooltip, Stack, Container }   from '@mui/material';
import { default as LocationOn }                                        from '@mui/icons-material/LocationOn';
import { default as Email }                                             from '@mui/icons-material/Email';
import { default as YouTube }                                           from '@mui/icons-material/YouTube';
import { GitHub }                                                       from '@mui/icons-material';
import { default as Instagram }                                         from '@mui/icons-material/Instagram';
import { default as Facebook }                                          from '@mui/icons-material/Facebook';
import { default as Policy }                                            from '@mui/icons-material/Policy';
import { default as Gavel }                                             from '@mui/icons-material/Gavel';
import { useTheme }                                                     from '@mui/material/styles';

/* Portal includes */
import { ReactComponent as HudsonIcon }                                 from '../../assets/icons/hudson.svg';
import { ReactComponent as FllIcon }                                    from '../../assets/icons/fll.svg';
import { ReactComponent as FasnyIcon }                                  from '../../assets/icons/fasny.svg';
import { ReactComponent as SharkbotsIcon }                              from '../../assets/icons/sharkbots.svg';

/* Local includes */
import FooterAvatar from './FooterAvatar';

function FooterDesktop(props) {

    /* --------- Gather inputs --------- */
    const { isDark } = props;
    const theme = useTheme();
    //const componentName = 'FooterDesktop';

    /* -------- Defining theme --------- */
    const main_color = theme.palette.primary.main;

    let background_color = theme.palette.common.white;
    if (isDark) { background_color = theme.palette.common.black; }


    /* ----------- Define HTML --------- */
    /* eslint-disable padded-blocks */
    return (
        <Container id="footer-mobile" style={{ paddingLeft:5, paddingTop:0, paddingBottom:0, paddingRight:'5px' }}>
            <Divider style={{ color:main_color, borderColor:main_color, width:'100%' }}/>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} style={{ width:'100%', paddingTop:10, paddingLeft:0, paddingRight:0, paddingBottom:10 }}>
                <Typography style={{ textTransform:'uppercase', color:main_color, textAlign:'left', fontSize:'11px', fontWeight:'bold' }}>
                    Follow us:
                </Typography>
                <Tooltip title="GBR on YouTube">
                    <Link href="https://www.youtube.com/channel/UC-sG91KPJL1uP7vpQwxXKhg" target="_blank">
                        <FooterAvatar variant="circle" col={main_color} ><YouTube style={{ backgroundColor:main_color, color:background_color, padding:2, height:'20px'  }}/></FooterAvatar>
                    </Link>
                </Tooltip>
                <Tooltip title="GBR on Github">
                    <Link href="https://github.com/the-green-brick-road/" target="_blank">
                        <FooterAvatar variant="circle" col={main_color}><GitHub style={{ backgroundColor:main_color, color:background_color, padding:2, height:'20px'  }}/></FooterAvatar>
                    </Link>
                </Tooltip>
                <Tooltip title="GBR on Facebook">
                    <Link href="https://www.facebook.com/100093250563007/" target="_blank">
                        <FooterAvatar variant="circle" col={main_color}><Facebook style={{ backgroundColor:main_color, color:background_color, padding:2, height:'20px'  }}/></FooterAvatar>
                    </Link>
                </Tooltip>
                <Tooltip title="GBR on Instagram">
                    <Link href="https://www.instagram.com/the.green.brick.road/" target="_blank">
                        <FooterAvatar variant="circle" col={main_color}><Instagram style={{ backgroundColor:main_color, color:background_color, padding:2, height:'20px'  }}/></FooterAvatar>
                    </Link>
                </Tooltip>
            </Stack>
            <Divider style={{ color:main_color, borderColor:main_color, width:'100%' }}/>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} style={{ width:'100%', paddingTop:10, paddingLeft:0, paddingRight:0 }}>
                        <Typography style={{ textTransform:'uppercase', color:main_color, textAlign:'left', fontSize:'11px', fontWeight:'bold' }}>
                            About us :
                        </Typography>
                        <Tooltip title="145 New Street - Mamaroneck, NY 10543">
                            <Link href="https://www.google.com/maps/place/145+New+St,+Mamaroneck,+NY+10543/@40.9574836,-73.7427351,17z/data=!3m1!4b1!4m6!3m5!1s0x89c29178999a22ed:0xf8e5945ae9a93104!8m2!3d40.9574796!4d-73.7401548!16s%2Fg%2F11bw503qfd?entry=ttu" target="_blank">
                                <LocationOn style={{ color:main_color, height:'24px' }}/>
                            </Link>
                        </Tooltip>
                        <Tooltip title="green.brick.road.first@gmail.com">
                            <Link href="mailto:green.brick.road.first@gmail.com">
                                <Email style={{ color:main_color, height:'24px'}}/>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Privacy policy">
                            <Policy style={{ color:main_color, height:'24px' }}/>
                        </Tooltip>
                        <Tooltip title="Terms & Conditions">
                            <Gavel style={{ color:main_color, height:'24px' }}/>
                        </Tooltip>

                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} style={{ width:'100%', paddingBottom:10, paddingTop:10 }}>
                        <Typography style={{ textTransform:'uppercase', color:main_color, textAlign:'left', fontSize:'11px', fontWeight:'bold' }}>
                            Resources :
                        </Typography>
                        <Tooltip title="First Lego League">
                            <Link href="https://www.firstlegoleague.org/" target="_blank">
                                <FllIcon fill={main_color} style={{ color:main_color, height:'24px' }}/>
                            </Link>
                        </Tooltip>
                        <Tooltip title="French American School of New York">
                            <Link href="https://www.fasny.org/" target="_blank">
                                <FasnyIcon fill={main_color} style={{ height:'24px' }}/>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Our big brothers & sisters from FTC team">
                            <Link href="https://www.sharkbots.org/" target="_blank">
                                <SharkbotsIcon fill={main_color} style={{height:'24px' }}/>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Our regional First Lego League">
                            <Link href="https://sites.google.com/site/hudsonvalleyfirstlegoleague/" target="_blank">
                                <HudsonIcon fill={main_color} style={{ color:main_color, height:'24px' }}/>
                            </Link>
                        </Tooltip>
                    </Stack>
                </Grid>
            </Grid>
            <Divider style={{ color:main_color, borderColor:main_color, width:'100%' }}/>
            <Typography style={{ color:main_color, fontSize:'10px' }}> THE GREEN BRICK ROAD Copyright © 2023 The Green Brick Road </Typography>
            <Typography style={{ color:main_color, fontSize:'10px' }}> All rights reserved </Typography>
            <Typography style={{ color:main_color, fontSize:'10px' }}> {process.env.REACT_APP_VERSION}</Typography>
        </Container>
    );
    /* eslint-enable padded-blocks */

}

export default FooterDesktop;
