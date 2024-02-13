/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Privacy policy view component
# -------------------------------------------------------
# Nadège LEMPERIERE, @20 june 2023
# Latest revision: 22 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }                                                          from 'react';

/* Material UI includes */
import { Typography, Container, List, ListItemText, ListItemIcon, ListItem } from '@mui/material';
import { default as Circle }                                                 from '@mui/icons-material/Circle';

/* Portal includes */
import { useDesign, useLogging }                                             from '../../providers';


function Policy() {

    /* --------- Gather inputs --------- */
    const { sizes }     = useDesign();
    const { onRender }  = useLogging();
    const componentName = 'Chicken'

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Container style={{ backgroundColor:'rgba(255,255,255,0)', width:'100%', height:sizes['menu-height'], padding:0, position:'relative' }}/>
            <Container style={{ marginBottom:10 }}>
                <Typography variant="h1" style={{marginBottom:'30px'}}> Privacy Policy </Typography>
                <Typography style={{fontSize:'12px', fontWeight:'bold'}}>Effective date: 22nd day of June, 2023</Typography>
                <Typography style={{fontSize:'12px'}}>the-green-brick-road.org (the "Site") is owned and operated by the-green-brick-road team. The data controller and can be contacted at:  green.brick.road.first@gmail.com</Typography>
                <Typography variant="h2"> Purpose </Typography>
                <Typography style={{fontSize:'12px'}}>The purpose of this privacy policy (this "Privacy Policy") is to inform users of our Site of the following: </Typography>
                <List>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>The personal data we will collect;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Use of collected data;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Who has access to the data collected;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>The rights of Site users; and</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>The Site's cookie policy.</ListItemText></ListItem>
                </List>
                <Typography style={{fontSize:'12px'}}>This Privacy Policy applies in addition to the terms and conditions of our Site.</Typography>
                <Typography variant="h2"> GDPR </Typography>
                <Typography style={{fontSize:'12px'}}>For users in the European Union, we adhere to the Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016, known as the General Data Protection Regulation (the "GDPR"). For users in the United Kingdom, we adhere to the GDPR as enshrined in the Data Protection Act 2018.</Typography>
                <Typography style={{fontSize:'12px'}}>We have not appointed a Data Protection Officer as we do not fall within the categories of controllers and processors required to appoint a Data Protection Officer under Article 37 of the GDPR.</Typography>
                <Typography variant="h2"> Consent </Typography>
                <Typography style={{fontSize:'12px'}}>By using our Site users agree that they consent to the conditions set out in this Privacy Policy.</Typography>
                <Typography style={{fontSize:'12px'}}>When the legal basis for us processing your personal data is that you have provided your consent to that processing, you may withdraw your consent at any time. If you withdraw your consent, it will not make processing which we completed before you withdrew your consent unlawful.</Typography>
                <Typography style={{fontSize:'12px'}}>You can withdraw your consent by sending an email to green.brick.road.first@gmail.com.</Typography>
                <Typography variant="h2"> Legal Basis for Processing </Typography>
                <Typography style={{fontSize:'12px'}}>We collect and process personal data about users in the EU only when we have a legal basis for doing so under Article 6 of the GDPR. </Typography>
                <Typography style={{fontSize:'12px'}}>We rely on the following legal basis to collect and process the personal data of users in the EU. Users have provided their consent to the processing of their data for one or more specific purposes.</Typography>
                <Typography variant="h2"> Personal Data We Collect </Typography>
                <Typography style={{fontSize:'12px'}}>We only collect data that helps us achieve the purpose set out in this Privacy Policy. We will not collect any additional data beyond the data listed below without notifying you first.</Typography>
                <Typography style={{fontSize:'12px'}}>We may also collect the following data when you perform certain functions on our Site:</Typography>
                <List>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>First and last name;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Email address; and</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Phone number</ListItemText></ListItem>
                </List>
                <Typography style={{fontSize:'12px'}}>This data may be collected upon creation of an account</Typography>
                <Typography variant="h2">How We Use Personal Data</Typography>
                <Typography style={{fontSize:'12px'}}>Data collected on our Site will only be used for the purposes specified in this Privacy Policy or indicated on the relevant pages of our Site. We will not use your data beyond what we disclose in this Privacy Policy.</Typography>
                <Typography style={{fontSize:'12px'}}>The data we collect when the user performs certain functions may be used for communication and data access restriction</Typography>
                <Typography variant="h2">Who We Share Personal Data With</Typography>
                <Typography variant="h3">Administrators</Typography>
                <Typography style={{fontSize:'12px'}}>We may disclose user data to any member of our organization who reasonably needs access to user data to achieve the purposes set out in this Privacy Policy</Typography>
                <Typography variant="h3">Other Disclosures</Typography>
                <Typography style={{fontSize:'12px'}}>We will not sell or share your data with other third parties, except in the following cases:</Typography>
                <List>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>If the law requires it;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>If it is required for any legal proceeding;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>To prove or protect our legal rights; and</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>To buyers or potential buyers of this company in the event that we seek to sell the company.</ListItemText></ListItem>
                </List>
                <Typography style={{fontSize:'12px'}}>If you follow hyperlinks from our Site to another Site, please note that we are not responsible for and have no control over their privacy policies and practices.</Typography>
                <Typography variant="h2">How Long We Store Personal Data</Typography>
                <Typography style={{fontSize:'12px'}}>User data will be stored for 2 years.</Typography>
                <Typography style={{fontSize:'12px'}}>You will be notified if your data is kept for longer than this period.</Typography>
                <Typography variant="h2">How We Protect Your Personal Data</Typography>
                <Typography style={{fontSize:'12px'}}>In order to protect your security, we use the strongest available browser encryption and store all of our data on servers in secure facilities. All data is only accessible to our administrators.</Typography>
                <Typography style={{fontSize:'12px'}}>While we take all reasonable precautions to ensure that user data is secure and that users are protected, there always remains the risk of harm. The Internet as a whole can be insecure at times and therefore we are unable to guarantee the security of user data beyond what is reasonably practical.</Typography>
                <Typography variant="h2">International Data Transfers</Typography>
                <Typography style={{fontSize:'12px'}}>We transfer user personal data to the united states</Typography>
                <Typography style={{fontSize:'12px'}}>When we transfer user personal data we will protect that data as described in this Privacy Policy and comply with applicable legal requirements for transferring personal data internationally.</Typography>
                <Typography style={{fontSize:'12px'}}>If you are located in the United Kingdom or the European Union, we will only transfer your personal data if:</Typography>
                <List>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>The country your personal data is being transferred to has been deemed to have adequate data protection by the European Commission or, if you are in the United Kingdom, by the United Kingdom adequacy regulations; or</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>We have implemented appropriate safeguards in respect of the transfer. For example, the recipient is a party to binding corporate rules, or we have entered into standard EU or United Kingdom data protection contractual clauses with the recipient.</ListItemText></ListItem>
                </List>
                <Typography variant="h2">Your Rights as a User</Typography>
                <Typography style={{fontSize:'12px'}}>Under the GDPR, you have the following rights:</Typography>
                <List>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Right to be informed;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Right of access;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Right to rectification;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Right to erasure;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Right to restrict processing;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Right to data portability; and</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Right to object.</ListItemText></ListItem>
                </List>
                <Typography variant="h2">Children</Typography>
                <Typography style={{fontSize:'12px'}}>We collect the personal data of children under 16 years of age. We only collect the personal data of children under 16 years of age with the express consent of their parents or guardians. This consent is collected through a consent form</Typography>
                <Typography variant="h2">How to Access, Modify, Delete, or Challenge the Data Collected</Typography>
                <Typography style={{fontSize:'12px'}}>If you would like to know if we have collected your personal data, how we have used your personal data, if we have disclosed your personal data and to who we disclosed your personal data, if you would like your data to be deleted or modified in any way, or if you would like to exercise any of your other rights under the GDPR, please contact our privacy officer at green.brick.road.first@gmail.com</Typography>
                <Typography variant="h2">Do Not Track Notice</Typography>
                <Typography style={{fontSize:'12px'}}>Do Not Track ("DNT") is a privacy preference that you can set in certain web browsers. We respond to browser-initiated DNT signals. If we receive a DNT signal that indicates a user does not wish to be tracked, we will not track that user.</Typography>
                <Typography variant="h2">Cookie Policy</Typography>
                <Typography style={{fontSize:'12px'}}>A cookie is a small file, stored on a user's hard drive by a website. Its purpose is to collect data relating to the user's browsing habits. You can choose to be notified each time a cookie is transmitted. You can also choose to disable cookies entirely in your internet browser, but this may decrease the quality of your user experience.</Typography>
                <Typography style={{fontSize:'12px'}}>We use the following types of cookies on our Site:</Typography>
                <List>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Functional cookies: Functional cookies are used to remember the selections you make on our Site so that your selections are saved for your next visits;</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Analytical cookies: Analytical cookies allow us to improve the design and functionality of our Site by collecting data on how you access our Site, for example data on the content you access, how long you stay on our Site, etc; and</ListItemText></ListItem>
                    <ListItem style={{padding:0}}><ListItemIcon style={{minWidth:'8px'}}><Circle color="primary" style={{height:'8px',minWidth:'8px'}}/></ListItemIcon><ListItemText primaryTypographyProps={{fontSize:'12px'}}>Third-Party Cookies: Third-party cookies are created by a website other than ours. We may use third-party cookies to monitor usage and impact</ListItemText></ListItem>
                </List>
                <Typography variant="h2">Modifications</Typography>
                <Typography style={{fontSize:'12px'}}>This Privacy Policy may be amended from time to time in order to maintain compliance with the law and to reflect any changes to our data collection process. When we amend this Privacy Policy we will update the "Effective Date" at the top of this Privacy Policy. We recommend that our users periodically review our Privacy Policy to ensure that they are notified of any updates. If necessary, we may notify users by email of changes to this Privacy Policy.</Typography>
                <Typography variant="h2">Complaints</Typography>
                <Typography style={{fontSize:'12px'}}>If you have any complaints about how we process your personal data, please contact us through the contact methods listed in the contact information section section so that we can, where possible, resolve the issue. If you feel we have not addressed your concern in a satisfactory manner you may contact a supervisory authority. You also have the right to directly make a complaint to a supervisory authority.</Typography>
                <Typography variant="h2">Contact Information</Typography>
                <Typography style={{fontSize:'12px'}}>If you have any questions, concerns or complaints, you can contact our privacy officer at green.brick.road.first@gmail.com</Typography>
            </Container></Profiler>
    );



}


export default Policy;