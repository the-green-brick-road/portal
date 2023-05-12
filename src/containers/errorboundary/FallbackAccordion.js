/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Fallback component for error boundary
# -------------------------------------------------------
# Nadège LEMPERIERE, @10 may 2023
# Latest revision: 10 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { styled } from '@mui/system';

const FallbackAccordion = styled(Accordion)(() => ({
    width: '60%',
    paddingLeft: '20%',
    paddingRight: '20%',
    border: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    color:'#ffffff',
    backgroundColor: 'rgba(255,255,255,0)',
    '&:before': { display: 'none' },
}));

const FallbackAccordionSummary= styled(AccordionSummary)(({col}) => ({
    border: 0,
    margin: 0,
    color:'#ffffff',
    'p': {
        textAlign: 'center',
        width:'100%',
        fontSize: '1.5rem',
    },
    '.Mui-expanded &' : { margin: 0 },
    '.Mui-expanded > p': { fontWeight: 'bold' },
    '.MuiAccordionSummary-expandIconWrapper' : { color:'#ffffff' },
}));

const FallbackAccordionDetails= styled(AccordionDetails)(() => ({
    border:0,
    color:'#ffffff',
    width:'100%',
}));



export {FallbackAccordion, FallbackAccordionSummary, FallbackAccordionDetails};