/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Login modal component definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @21 may 2023
# Latest revision: 22 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useEffect }                                from 'react';

/* Material UI includes */
import { Modal, Typography, Stack, Box }            from '@mui/material';
import { useTheme }                                 from '@mui/material/styles';

/* Portal includes */
import { useAuthentication, useLogging, useDesign } from '../../providers';
import { Image }                                    from '../../components';

function Login() {

    /* --------- Gather inputs --------- */
    const { ui, config, isOpen, setIsOpen, error, resetError }  = useAuthentication();
    const { logText }                                           = useLogging();
    const { sizes }                                             = useDesign();
    const theme                                                 = useTheme();
    const componentName                                         = 'Login';

    /* -------- Defining theme --------- */
    const topBox   = `calc(2 * ${sizes['menu-height']}px + ${sizes['margin']}px + 40px )`
    const widthBox = `calc(max(40vw, 300px))`
    const leftBox  = `calc(50vw - max(40vw, 300px) / 2)`


    /* --- Initialize firebaseui div --- */
    useEffect(() => {

        if(ui && isOpen) { ui.start("#firebaseui-auth-container", config); }

    }, [ui, config, isOpen]); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* ---- Defining events handler ---- */
    const handleClose = (event) => {

        setIsOpen(false);
        resetError();

    }

    /* ----------- Define HTML --------- */
    return (

        <Modal keepMounted open={isOpen} onClose={handleClose} >
            <Box style={{ position:'relative', backgroundColor:theme.palette.primary.main, width:widthBox, left:leftBox, top:topBox }}>
                <Stack direction="column" alignItems="center" style={{ position:'relative', top:'-40px' }}>
                    <Image name="logo" style={{ width:'80px', height:'80px'}}/>
                    <Typography style={{ color:theme.palette.secondary.main, fontSize:'20px', fontWeight:'bold', textTransform:'uppercase' }}> Welcome! </Typography>
                    <Typography style={{ color:theme.palette.secondary.main, fontSize:'14px', fontWeight:'bold' }}> Sign in or create account </Typography>
                    <div id="firebaseui-auth-container" style={{ marginTop:'20px' }}> </div>
                    <Typography style={{ fontSize:'14px', color:'red' }}> {error} </Typography>
                </Stack>
            </Box>
        </Modal>
    );

}

export default Login;