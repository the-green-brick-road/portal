/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Terms and Conditions view component
# -------------------------------------------------------
# Nadège LEMPERIERE, @20 june 2023
# Latest revision: 20 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }                                                                from 'react';

/* Material UI includes */
import { Typography, Container, List, ListItemText, ListItemIcon, ListItem } from '@mui/material';
import { default as Circle }                                                 from '@mui/icons-material/Circle';

/* Portal includes */
import { useDesign, useLogging }                                             from '../../providers';

function Terms() {

    /* --------- Gather inputs --------- */
    const { sizes }     = useDesign();
    const { onRender }  = useLogging();
    const componentName = 'Terms'

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Container style={{ backgroundColor:'rgba(255,255,255,0)', width:'100%', height:sizes['menu-height'], padding:0, position:'relative' }}/>
            <Container style={{ marginBottom:10 }}>
                <Typography variant="h1" style={{marginBottom:'30px'}}> Terms & Conditions </Typography>
                <Typography style={{fontSize:'12px'}}>These Terms and Conditions (the "Terms and Conditions") govern the use of the-green-brick-road.org. This Site is owned and operated by the-green-brick-road. This site is an educational website. </Typography>
                <Typography style={{fontSize:'12px'}}>By using this Site, you indicate that you have read and understood these Terms and Conditions and agree to abide by them at all times </Typography>
                <Typography variant="h2"> Intellectual property </Typography>
                <Typography style={{fontSize:'12px'}}>All content published and made available on our site is the property of the-green-brick-road. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.</Typography>
                <Typography variant="h2"> Acceptable Use </Typography>
                <Typography style={{fontSize:'12px'}}>As a user of our Site, you agree to use our Site legally, not to use our Site for illegal purposes, and not to:</Typography>
                <List>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Violate the rights of other users of our Site;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Violate the intellectual property rights of the Site owners or any third party to the Site;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Hack into the account of another user of the Site; or</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Act in any way that could be considered fraudulent.</ListItemText></ListItem>
                </List>
                <Typography style={{fontSize:'12px'}}>If we believe you are using our Site illegally or in a manner that violates these Terms and Conditions, we reserve the right to limit, suspend or terminate your access to our Site. We also reserve the right to take any legal steps necessary to prevent you from accessing our Site.</Typography>
                <Typography variant="h2"> Accounts </Typography>
                <Typography style={{fontSize:'12px'}}>When you create an account on our Site, you agree to the following:</Typography>
                <List>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes.</ListItemText></ListItem>
                </List>
                <Typography style={{fontSize:'12px'}}>We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.</Typography>
                <Typography variant="h2"> Links to Other Websites </Typography>
                <Typography style={{fontSize:'12px'}}>Our Site contains links to third party websites or services that we do not own or control. We are not responsible for the content, policies, or practices of any third party website or service linked to on our Site. It is your responsibility to read the terms and conditions and privacy policies of these third party websites before using these sites.</Typography>
                <Typography variant="h2"> Limitation of Liability </Typography>
                <Typography style={{fontSize:'12px'}}>our administrators will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site.</Typography>
                <Typography variant="h2"> Indemnity </Typography>
                <Typography style={{fontSize:'12px'}}>Except where prohibited by law, by using this Site you indemnify and hold harmless our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.</Typography>
                <Typography variant="h2"> Applicable Law </Typography>
                <Typography style={{fontSize:'12px'}}>These Terms and Conditions are governed by the laws of the State of New York.</Typography>
                <Typography variant="h2"> Severability </Typography>
                <Typography style={{fontSize:'12px'}}>If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid.</Typography>
                <Typography variant="h2"> Changes </Typography>
                <Typography style={{fontSize:'12px'}}>These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice on our Site.</Typography>
                <Typography variant="h2"> Contact Details </Typography>
                <Typography style={{fontSize:'12px'}}>Please contact us if you have any questions or concerns.</Typography>

            </Container>
        </Profiler>
    );

}


export default Terms;