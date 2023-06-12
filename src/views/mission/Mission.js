
/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Mission view component
# -------------------------------------------------------
# Nadège LEMPERIERE, @26 may 2023
# Latest revision: 10 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Fragment }              from 'react';

/* Material UI includes */
import { Typography, Container } from '@mui/material';

/* Portal includes */
import { useDesign }             from '../../providers';
import { Image }                 from '../../components'

function Mission() {


    /* --------- Gather inputs --------- */
    const { sizes }     = useDesign();

    /* ----------- Define HTML --------- */
    return (
        <Fragment>
            <Container style={{ backgroundColor:'#333333', width:'100%', height:sizes['menu-height'], padding:0, position:'relative' }}/>
            <Container style={{ width:'100%', padding:0, position:'relative' }}>
                <Image name="mission" style={{ width:'100%', pointerEvents: 'none' }}/>
                <Container style={{ position: 'absolute', zIndex: '1', bottom: '20%', right: '10%', width: '85%'}}>
                    <Image name="gbr" style={{ pointerEvents: 'none', width:'100%', position: 'absolute', zIndex:1 }}/>
                </Container>
            </Container>
            <Container style={{ paddingTop:'20px', paddingBottom:'20px' }}>
                <Typography variant="h1" > Welcome to the Home of Future Innovators<br/>Our World-Class Robotics Team!</Typography>
                <Typography variant="body2" style={{ paddingTop:10, textAlign:'justify' }}> Are you excited by the <strong>cutting-edge world of robotics</strong>? Do you want to be part of a community where <strong>innovation, creativity, and technical know-how</strong> come together to create fantastic, forward-thinking machines? Look no further! You've arrived at the right place. </Typography>
                <Typography variant="body2" style={{ paddingTop:10, textAlign:'justify' }}> The <strong>French American School of New York middle school robotics team</strong> is not just a group - it's an immersive experience, a hub of dedicated kids working together to reshape the future. We are a diverse, dedicated team of students who share a common passion: using technology to solve complex problems and push the boundaries of what's possible. </Typography>
                <Typography variant="body2" style={{ paddingTop:10, textAlign:'justify' }}> We all share a love for robotics, engineering, and innovation. We design, build, program, and operate lego robots, aiming to <strong>compete in local, national, and international competitions</strong>. But more than that, we are a <strong>community</strong>. We are learners, teachers, and explorers on a never-ending quest for knowledge and improvement. </Typography>
                <Typography variant="body2" style={{ paddingTop:10, textAlign:'justify' }}> But don't just take our word for it! We invite you to explore our website, check out our accomplishments, and see the groundbreaking projects we're working on. Whether you're a robotics veteran or a complete beginner, you'll find a place here. </Typography>
                <Typography variant="body2" style={{ paddingTop:10, textAlign:'justify' }}> Joining us isn't just about participating in competitions or building robots; it's about <strong>developing critical thinking skills, learning to work in a team, and cultivating a passion for science and technology that will last a lifetime.</strong> </Typography>
                <Typography variant="body2" style={{ paddingTop:10, textAlign:'justify' }}> If you're ready to challenge yourself, gain hands-on experience, and be part of a team where your ideas are valued, we invite you to join us! Step into the world of robotics, challenge your limits, create the extraordinary and let's shape the future, together. </Typography>
                <Typography variant="body2" style={{ paddingTop:10, textAlign:'justify' }}> Remember, the future is not something that just happens. It's something we build. And we're excited to build it with you! </Typography>
                <Typography variant="body2" style={{ paddingTop:10, textAlign:'justify', fontWeight:'bold' }}> Are you ready to engineer the future with us? </Typography>
            </Container>
        </Fragment>
    );

}


export default Mission;