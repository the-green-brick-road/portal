/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Login component
# -------------------------------------------------------
# Nadège LEMPERIERE, @16 june 2023
# Latest revision: 16 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler, useEffect, useRef, Fragment }              from 'react';

/* Material UI includes */
import { IconButton, Dialog, DialogTitle, Typography, Link }  from '@mui/material';
import { default as AppRegistration }                         from '@mui/icons-material/AppRegistration';
import { default as Person }                                  from '@mui/icons-material/Person';
import { default as AppLogin }                                from '@mui/icons-material/Login';
import { default as Logout }                                  from '@mui/icons-material/Logout';
import { default as Email }                                   from '@mui/icons-material/Email';
import { default as Google }                                  from '@mui/icons-material/Google';

/* Portal includes */
import { useLogging, useAuth }                                from '../../providers';

/* Local includes */
import { default as LoginButton }                             from './LoginButton'

function Login(props) {

    /* --------- Gather inputs --------- */
    const { color, bgcolor, current=null } = props;
    const { onRender, logText }      = useLogging();
    const { ui, config, registration, isAuthenticated, signOut, setIsOpen, isOpen, user, message, resetMessage, shallRefresh } = useAuth();
    const componentName = 'Login';
    const ref           = useRef();
    if (current !== null) { ref.current = current}

    /* -------- Defining theme --------- */
    const margin = `calc(max(24px,(100% - 220px) /2))`

    logText(componentName,'log','workflow',` isOpen : ${isOpen}, isAuthenticated : ${isAuthenticated}, shallRefresh : ${shallRefresh}`)

    useEffect(() => {

        logText(componentName,'log','workflow',` isOpen : ${isOpen}, isAuthenticated : ${isAuthenticated}, ref.current : ${ref.current}`)

        if(isOpen && (!isAuthenticated) && (ref.current !== undefined)) {

            console.log('starting')
            ui.start("#firebaseui-auth-container", config);

        }

    }, [ref.current, isOpen, isAuthenticated, ui, config, shallRefresh]); /* eslint-disable-line react-hooks/exhaustive-deps */

    const handleOpen = () => { setIsOpen(true); resetMessage(); }
    const handleClose = () => { setIsOpen(false); resetMessage(); }
    const handleSignOut = () => { signOut(); setIsOpen(false); }
    const handleEmail = () => { setIsOpen(true); }
    const handleGoogle = () => { setIsOpen(true); }

    logText(componentName,'debug','workflow',' Rendering')

    /* ----------- Define HTML --------- */
    /* eslint-disable padded-blocks */
    return (

        <Profiler id={componentName} onRender={onRender}>

            <IconButton aria-label='options' style={{backgroundColor:color, color:bgcolor}} onClick={handleOpen}>
                {!(isAuthenticated) && (<AppLogin color={color}/>)}
                {(isAuthenticated) && (<Person color={color}/>)}
            </IconButton>
            <Dialog keepMounted open={isOpen} onClose={handleClose} style={{'div':{textAlign:'center'} }}>
                {(isAuthenticated) && (<DialogTitle style={{ color:'white', fontSize:'14px', paddingTop:5, paddingBottom:5, textAlign:'center' }}> {user.email} </DialogTitle>)}
                {(isAuthenticated) && (<DialogTitle style={{ color:'white', fontSize:'14px', paddingTop:5, paddingBottom:0, textAlign:'center' }}> {user.role} </DialogTitle>)}
                {(message && message.length !== 0) && (<DialogTitle style={{ color:'white', fontSize:'14px', paddingTop:5, paddingBottom:0, textAlign:'center' }}> {message} </DialogTitle>)}
                {(registration !== null) && (
                    <LoginButton aria-label='registration' onClick={handleClose} href={registration} margin={margin} target="_blank" variant="contained" startIcon={<AppRegistration fontSize="small" style={{height:'18px', width:'18px', color:'white'}} />} >
                        Join
                    </LoginButton>
                )}
                {(!isAuthenticated) && (
                    <Fragment>
                        <LoginButton aria-label='registration' onClick={handleEmail} margin={margin} target="_blank" variant="contained" startIcon={<Email fontSize="small" style={{height:'18px', width:'18px', color:'white'}} />} >
                            Sign in with email
                        </LoginButton>
                        <LoginButton aria-label='registration' onClick={handleGoogle} margin={margin} target="_blank" variant="contained" style={{ marginBottom:(isAuthenticated?'0px':'16px') }} startIcon={<Google fontSize="small" style={{height:'18px', width:'18px', color:'white'}} />} >
                            Sign in with Google
                        </LoginButton>
                        <Typography style={{ fontSize:'10px' }}>By continuing, you are indicating that you accept our <Link href='/terms'>Terms of Service</Link> and <Link href='/policy'>Privacy Policy</Link></Typography>
                        <div ref={ref} id="firebaseui-auth-container"/>
                    </Fragment>
                )}
                {(isAuthenticated) && (
                    <LoginButton aria-label="logout" onClick={handleSignOut} margin={margin} target="_blank" variant="contained" style={{ marginBottom:(isAuthenticated?'16px':'0px') }} startIcon={<Logout fontSize="small" style={{height:'18px', width:'18px', color:'white'}} />} >
                        Log out
                    </LoginButton>
                )}
            </Dialog>
        </Profiler>
    );
    /* eslint-enable padded-blocks */

}

export default Login;
