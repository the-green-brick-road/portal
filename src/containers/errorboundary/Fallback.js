/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Fallback component for error boundary
# -------------------------------------------------------
# Nadège LEMPERIERE, @08 may 2023
# Latest revision: 10 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useState, Fragment }                from 'react';

/* Material UI includes */
import { Container, Box, Typography, Stack } from '@mui/material';
import { WarningAmberRounded, ExpandMore }   from '@mui/icons-material';

/* Portal includes */
import { useLogging }                        from "../../providers";

/* Local includes */
import { FallbackAccordion, FallbackAccordionSummary, FallbackAccordionDetails } from './FallbackAccordion';

function Fallback(props) {

    /* --------- Gather inputs --------- */
    const { error={ message: '', stack: '' } }     = props;
    const { logText }                              = useLogging();
    const componentName                            = 'Fallback';

    /* Initialize state */
    const [isOpen, dispatch] = useState(false);

    /* Fomatting stack */
    const stack_lines = error.stack.split('\n')

    /* Event handling functions */
    const handleChange = (event) => {

        logText(componentName, 'log', 'workflow', ' handleClick --- BEGIN');
        dispatch(!isOpen)
        logText(componentName, 'log', 'workflow', ' handleClick --- END');

    };

    /* ----------- Define HTML --------- */
    return (
        <Container style={{maxWidth:'100vw', width:'100vw', height:'100vh', margin:0, backgroundColor:'#cae6c2', padding:0}}>
            <Box style={{ color:'#ffffff', width:'100vw', padding:10, align:'center', height:'50vh', paddingTop:'50vh', paddingRight:0}}>
                <Stack spacing={2} direction="row" justifyContent="center">
                    <WarningAmberRounded color='#ffffff' style={{ width:'35px', height:'35px' }}/>
                    <Typography data-testid="fallback-message" style={{ fontSize:'1.5rem', textAlign:'center', textTransform:'uppercase', fontWeight:'bold'}}> SOMETHING WENT WRONG </Typography>
                </Stack>
                <FallbackAccordion disableGutters elevation={0} expanded={isOpen} onChange={handleChange} >
                    <FallbackAccordionSummary data-testid="fallback-accordion" expandIcon={<ExpandMore color='#ffffff'/>}>
                        <Typography data-testid='fallback-error'> {error.message} </Typography>
                    </FallbackAccordionSummary>
                    <FallbackAccordionDetails>

                        { stack_lines.map((item, index) => {

                            var  line = ''
                            const label = `fallback-stack-${index}`
                            if(index > 0) {

                                line = item.split(' at ');
                                line = line[1];
                                line = line.trim();

                            }
                            return(
                                <Fragment key={index}>
                                    {(index > 0) && (<Typography data-testid={label} > --- at {line} </Typography>)}
                                </Fragment>
                            )

                        })}

                    </FallbackAccordionDetails>
                </FallbackAccordion>
            </Box>

        </Container>
    )

}

export default Fallback;

