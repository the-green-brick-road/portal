/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Authentication provider to share user rights between components
# -------------------------------------------------------
# Nadège LEMPERIERE, @18 may 2023
# Latest revision: 18 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useReducer, useEffect, useState }           from 'react';

/* Portal includes */
import { useLogging, useConfiguration }                       from '../../providers';

/* Local includes */
import { Context }                                            from './Context';
import { useInitializeApp, useGetAuth, useGetUIAuth }         from './FirebaseHook';
import { useEmailAuthProvider, useGoogleAuthProvider }        from './FirebaseHook';
import { useGetFirestore, useCollection, useDeleteUser }      from './FirebaseHook';
import { useQuery, useGetDocs, useWhere, useGetApps }         from './FirebaseHook';
import { setIsAuthenticated, setToken, setIsOpen, setError }  from './store/actions';
import reducer                                                from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'authentication' } = props;
    const { logText }                                 = useLogging();
    const { config }                                  = useConfiguration();
    const { firebase = {}}                            = config;
    const getAuth                                     = useGetAuth();
    const getFirestore                                = useGetFirestore();
    const getApps                                     = useGetApps();
    const initializeApp                               = useInitializeApp();
    const getUIAuth                                   = useGetUIAuth();
    const EmailAuthProvider                           = useEmailAuthProvider();
    const GoogleAuthProvider                          = useGoogleAuthProvider();
    const collection                                  = useCollection();
    const deleteUser                                  = useDeleteUser();
    const query                                       = useQuery();
    const where                                       = useWhere();
    const getDocs                                     = useGetDocs();
    const componentName = 'AuthenticationProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [authenticationStore, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
        isOpen: false,
        token: "",
        error: "",
        ...savedState,
    });

    const [firebaseState, setFirebase] = useState({auth: null, ui: null, config: {}})

    useEffect(() => {

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
        const local_auth       = getAuth(app);
        const local_store      = getFirestore(app);
        let ui = getUIAuth.AuthUI.getInstance();
        if (!ui) { ui = new getUIAuth.AuthUI(local_auth) }
        console.log(ui)
        const collection_users = collection(local_store,'users')

        var ui_config = {
            signInSuccessUrl: "/",
            signInOptions: [EmailAuthProvider.PROVIDER_ID, GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl){

                    console.log('here')
                    console.log(authResult.user.email)

                    const snapshot = query(collection_users, where('email', '==', authResult.user.email));
                    getDocs(snapshot).then((docs) => {

                        console.log(snapshot)
                        console.log(docs)
                        if (!docs.empty) {

                            dispatch(setIsAuthenticated(true))
                            dispatch(setError(""))
                            dispatch(setIsOpen(false))
                            logText(componentName,'warning','login',' Authentication succeeded')
                            authResult.user.getIdToken().then(function(accessToken) { setToken(accessToken) })

                            return true

                        }
                        else {

                            dispatch(setIsAuthenticated(false))
                            logText(componentName,'warning','login',' Authentication failed')
                            deleteUser(authResult.user)
                            dispatch(setError("User is not authorized to access this content"))
                            console.log(authenticationStore.error)
                            return false

                        }

                    })

                },
                signInFailure: function(error) {

                    dispatch(setError("Authentication failed"))
                    logText(componentName,'warning','login',' Authentication failed')

                },
            },
        };


        setFirebase({auth: local_auth, ui:ui, config:ui_config})

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(authenticationStore))

    }, [authenticationStore, persistKey]);

    const state = useMemo(() => ({
        setIsAuthenticated(value) { dispatch(setIsAuthenticated(value)) },
        setIsOpen(value)          { dispatch(setIsOpen(value)) },
        setToken(value)           { dispatch(setToken(value)) },
        resetError()              { dispatch(setError("")) },
        isAuthenticated :         authenticationStore.isAuthenticated,
        isOpen:                   authenticationStore.isOpen,
        error:                    authenticationStore.error,
        ui:                       firebaseState.ui,
        config:                   firebaseState.config,
    }), [authenticationStore, firebaseState]); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* ----------- Define HTML --------- */
    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );

}

export default Provider;
