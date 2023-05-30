/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Season accordion customization
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { styled } from '@mui/system';


const SeasonAccordion = styled(Accordion)(() => ({
    width: '100%',
    border: 0,
}));

const SeasonAccordionSummary= styled(AccordionSummary)(({col}) => ({
    border: 0,
    margin: 0,
    width:'100%',
    marginTop: '2px',
    marginBottom: '2px',
    minHeight: '15px',
    'p' : { color: col} ,
    'div' : {
        marginTop: '2px',
        marginBottom: '2px',
    } ,
    'svg' : { color: col } ,
    '.Mui-expanded' : {
        margin: '5px 0',
        minHeight:'20px',
        color: 'white',
        backgroundColor: col,
    },
    '.Mui-expanded &' : {
        minHeight:'20px',
        backgroundColor: col,
    },
    '.the-green-brick-road-o4b71y-MuiAccordionSummary-content.Mui-expanded': {
        marginTop: '2px',
        marginBottom: '2px',
    },
    '.Mui-expanded > p': {
        color: 'white',
        fontWeight: 'bold',
    },
    '.Mui-expanded > svg': { color: 'white' },
}));

const SeasonAccordionDetails= styled(AccordionDetails)(() => ({
    border:0,
    width:'100%',
}));



export {SeasonAccordion, SeasonAccordionSummary, SeasonAccordionDetails};