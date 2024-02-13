/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Authentication provider to share identity between
# components
# -------------------------------------------------------
# Nadège LEMPERIERE, @16 june 2023
# Latest revision: 16 june 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useState, useEffect, useReducer, Profiler }   from 'react';

/* Portal includes */
import { useLogging, useConfiguration }                         from '../../providers';

/* Local includes */
import { Context }                                              from './Context';
import { useFetch }                                             from './RestHook';
import { useInitializeApp, useGetApps, useGetUIAuth, useQuery } from './FirebaseHook';
import { useEmailAuthProvider, useGoogleAuthProvider }          from './FirebaseHook';
import { useGetAuth, useDeleteUser, useSignOut, useWhere }      from './FirebaseHook';
import { useGetFirestore, useCollection, useGetDocs }           from './FirebaseHook';
import { useOnAuthStateChanged, useSendEmailVerification }      from './FirebaseHook';
import { setIsAuthenticated, setShallRefresh }                  from './store/actions';
import { setIsOpen, setMessage, setUser, setRegistration }      from './store/actions';
import reducer                                                  from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'authentication' } = props;
    const { logText, onRender }                       = useLogging();
    const { config }                                  = useConfiguration();
    const { firebase = {}, calendars = {} }           = config;
    const fetch                                       = useFetch();
    const initializeApp                               = useInitializeApp();
    const getApps                                     = useGetApps();
    const getAuth                                     = useGetAuth();
    const getFirestore                                = useGetFirestore();
    const getUIAuth                                   = useGetUIAuth();
    const EmailAuthProvider                           = useEmailAuthProvider();
    const GoogleAuthProvider                          = useGoogleAuthProvider();
    const deleteUser                                  = useDeleteUser();
    const signOut                                     = useSignOut();
    const query                                       = useQuery();
    const where                                       = useWhere();
    const collection                                  = useCollection();
    const getDocs                                     = useGetDocs();
    const onAuthStateChanged                          = useOnAuthStateChanged();
    const sendEmailVerification                       = useSendEmailVerification();
    const componentName = 'AuthenticationProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));

    console.log(savedState)
    const [authenticationStore, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
        isOpen: false,
        shallRefresh: false,
        user: { role : '' },
        token: '',
        message: '',
        registration: null,
        ...savedState,
    });

    const [firebaseState, setFirebase] = useState({auth: null, ui: null, config: {}, firestore:null})

    useEffect(() => {

        logText(componentName,'debug','workflow',' Loading data --- BEGIN')

        /* Collect public calendar to check for registration date and link*/
        fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendars['public']['read']}/events?key=${firebase['api-key']}`)
            .then(response => response.json())
            .then(data => {

                let found = false

                for (let i_item = 0; i_item < data.items.length; i_item += 1)
                {

                    if (data.items[i_item].summary.search(/registration :/i) !== -1)
                    {

                        found = true
                        let date_start = null
                        let date_end = null
                        const date_now = new Date()
                        if ( 'date' in data.items[i_item].start ) {

                            date_start = new Date(data.items[i_item].start.date)
                            const offset = date_start.getTimezoneOffset()
                            date_start = new Date(date_start.getTime() + offset * 60 * 1000)

                        }
                        else if ( 'dateTime' in data.items[i_item].start ) {

                            const temp = new Date(Date.parse(data.items[i_item].start.dateTime))
                            temp.toLocaleString("en-US", {timeZone: data.items[i_item].start.timeZone})
                            date_start = temp

                        }
                        if ( 'date' in data.items[i_item].end )   {

                            date_end = new Date(data.items[i_item].end.date)
                            const offset = date_end.getTimezoneOffset()
                            date_end = new Date(date_end.getTime() + offset * 60 * 1000 - 1)

                        }
                        else if ( 'dateTime' in data.items[i_item].end )   {

                            const temp = new Date(Date.parse(data.items[i_item].end.dateTime))
                            temp.toLocaleString("en-US", {timeZone: data.items[i_item].end.timeZone})
                            date_end = temp

                        }

                        if ((date_now >= date_start) && (date_now <= date_end)) {

                            const start = data.items[i_item].description.indexOf('https')
                            const end = data.items[i_item].description.indexOf('"',start)
                            dispatch(setRegistration(data.items[i_item].description.substring(start,end)));

                        }
                        else { dispatch(setRegistration(null)); }

                    }

                }

                if(!found) { dispatch(setRegistration(null)); }

            });

        /* Set firebase configuration */
        const firebase_config = {
            apiKey:              firebase['api-key'],
            authDomain:          firebase['auth-domain'],
            projectId:           firebase['project-id'],
            storageBucket:       firebase['storage-bucket'],
            messagingSenderId:   firebase['messaging-sender-id'],
            appId:               firebase['app-id'],
            measurementId:       firebase['measurement-id'],
        };

        /* Initialize firebase if it was not previously done */
        const apps              = getApps()
        let app = null
        if( apps.length === 0 ) { app = initializeApp(firebase_config) }
        else                    { app = apps[0]}

        /* Initialize authentication and users database */
        const auth              = getAuth(app);
        const firestore         = getFirestore(app);
        let ui = getUIAuth.AuthUI.getInstance();
        if (!ui) { ui = new getUIAuth.AuthUI(auth) }
        const collection_users  = collection(firestore,'users')

        onAuthStateChanged(auth, (user) => {

            logText(componentName,'debug','workflow',` Authentication changed for user ${JSON.stringify(user)}`)

            if (user) {

                console.log(`email verified : ${user.emailVerified}`)

                const snapshot = query(collection_users, where('email', '==', user.email));
                getDocs(snapshot).then((docs) => {

                    if (!docs.empty) {

                        logText(componentName,'debug','workflow',' User found in database')

                        if(user.emailVerified) {

                            logText(componentName,'debug','workflow',' User is verified')

                            const local_user = {...user}
                            local_user.role = docs.docs[0].data().role
                            dispatch(setIsAuthenticated(true));
                            dispatch(setIsOpen(false));
                            dispatch(setUser(local_user));
                            dispatch(setMessage(''));
                            logText(componentName,'info','login',' Authentication succeeded')

                        }
                        else {

                            logText(componentName,'debug','workflow',' User is not verified : sending email')

                            sendEmailVerification(user, {url: 'https://the-green-brick-road.org'})
                                .then(() => {

                                    logText(componentName,'debug','login',` Email sent to user ${user.email}`)
                                    dispatch(setIsAuthenticated(false));
                                    dispatch(setShallRefresh(!authenticationStore.shallRefresh));
                                    dispatch(setUser({ role : '' }));
                                    dispatch(setMessage(`Verification email sent to ${user.email}`));
                                    ui.reset()

                                })
                                .catch((error) => {

                                    logText(componentName,'debug','login',` Failed to send verification email due to ${error}`)
                                    dispatch(setIsAuthenticated(false));
                                    dispatch(setShallRefresh(!authenticationStore.shallRefresh));
                                    dispatch(setUser({ role : '' }));
                                    dispatch(setMessage(error));
                                    ui.reset()

                                });

                        }

                    }
                    else {

                        logText(componentName,'warning','login',` User ${user.email} not in database`)
                        dispatch(setIsAuthenticated(false));
                        dispatch(setShallRefresh(!authenticationStore.shallRefresh));
                        dispatch(setUser({ role : '' }));
                        dispatch(setMessage('User is not authorized to access this content'));
                        ui.reset()
                        deleteUser(user)

                    }

                })

            } else {

                logText(componentName,'debug','login',' No user')

            }

        });

        var ui_config = {

            signInOptions: [ EmailAuthProvider.PROVIDER_ID, GoogleAuthProvider.PROVIDER_ID ],
            tosUrl: function() {

                dispatch(setIsOpen(false));
                window.location.assign('/terms');

            },
            privacyPolicyUrl: function() {

                dispatch(setIsOpen(false));
                window.location.assign('/policy');

            },
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl){ console.log('signInSuccessWithAuthResult'); return false },
                signInFailure: function(error) {


                    dispatch(setIsAuthenticated(false));
                    dispatch(setIsOpen(false));
                    dispatch(setUser({ role : '' }));
                    dispatch(setMessage('Authentication failed'));
                    logText(componentName,'warning','login',' Authentication failed')

                },
                emailLinkSignIn: function() {

                    console.log('emailLinkSignIn')

                },
            },
        };
        setFirebase({auth: auth, ui:ui, config:ui_config, firestore:firestore})
        logText(componentName,'debug','workflow',' Loading data --- END')

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        console.log(JSON.stringify(authenticationStore))
        localStorage.setItem(persistKey, JSON.stringify(authenticationStore))

    }, [authenticationStore, persistKey]);

    const state = useMemo(() => ({
        signOut()                 {

            dispatch(setIsAuthenticated(false))
            signOut(firebaseState.auth);

        },
        setIsOpen(value)          {

            console.log(value)
            dispatch(setIsOpen(value))

        },

        resetMessage()            { dispatch(setMessage('')) },
        ui:                       firebaseState.ui,
        config:                   firebaseState.config,
        isAuthenticated:          authenticationStore.isAuthenticated,
        isOpen:                   authenticationStore.isOpen,
        user:                     authenticationStore.user,
        registration:             authenticationStore.registration,
        message:                  authenticationStore.message,
        shallRefresh:             authenticationStore.shallRefresh,
    }), [firebaseState, authenticationStore, signOut]);

    logText(componentName,'debug','workflow',' Rendering')
    console.log(JSON.stringify(authenticationStore))

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Context.Provider value={state}>
                {children}
            </Context.Provider>
        </Profiler>
    );

}

export default Provider;
