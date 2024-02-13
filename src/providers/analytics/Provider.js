/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Analytics provider to share state and update between
# components
# -------------------------------------------------------
# Nadège LEMPERIERE, @03 may 2023
# Latest revision: 15 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useReducer, useEffect, useState, Profiler }       from 'react';

/* Portal includes */
import { useLogging, useConfiguration }                             from '../../providers';

/* Local includes */
import { Context }                                                  from './Context';
import { useInitializeApp, useIsSupported, useGetAnalytics }        from './FirebaseHook';
import { useGetPerformance, useSetAnalyticsCollectionEnabled }      from './FirebaseHook';
import { useGetApps }                                               from './FirebaseHook';
import { setIsAnalyticsActivated, setIsPerformanceActivated }       from './store/actions';
import reducer                                                      from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'analytics' } = props;
    const { logText, onRender }                  = useLogging();
    const { config }                             = useConfiguration();
    const { firebase = {}}                       = config;
    const isSupported                            = useIsSupported();
    const setAnalyticsCollectionEnabled          = useSetAnalyticsCollectionEnabled();
    const getAnalytics                           = useGetAnalytics();
    const getPerformance                         = useGetPerformance();
    const initializeApp                          = useInitializeApp();
    const getApps                                = useGetApps();
    const componentName = 'AnalyticsProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [metricsStore, dispatch] = useReducer(reducer, {
        isAnalyticsActivated:  false,   /* Is analytics report activated ? */
        isPerformanceActivated:  false, /* Is performance report activated ? */
        ...savedState,
    });

    const [firebaseState, setFirebase] = useState({analytics : null, performance : null})

    useEffect(() => {

        isSupported().then((isSupported) => {

            if (isSupported) {

                logText(componentName, 'info', 'data', ' Analytics exports are supported')

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

                /* Configure analytics */
                const local_analytics   = getAnalytics(app);
                const local_performance = getPerformance(app);
                setFirebase({analytics: local_analytics, performance: local_performance})
                setAnalyticsCollectionEnabled(local_analytics, metricsStore.isAnalyticsActivated)
                local_performance.instrumentationEnabled = metricsStore.isPerformanceActivated
                local_performance.dataCollectionEnabled  = metricsStore.isPerformanceActivated

            }

        })

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(metricsStore))

    }, [metricsStore, persistKey]);

    const state = useMemo(() => ({
        activateAnalytics()   {

            logText(componentName, 'info', 'data', ' Activating analytics')
            if (!navigator.doNotTrack && !window.doNotTrack) {

                if( firebaseState.analytics !== null ) { setAnalyticsCollectionEnabled(firebaseState.analytics, true) }
                dispatch(setIsAnalyticsActivated(true))

            }
            else { logText(componentName, 'info', 'data', ' Do Not Track has been activated') }

        },
        deactivateAnalytics() {

            logText(componentName, 'info', 'data', ' Deactivating analytics')
            if( firebaseState.analytics !== null ) { setAnalyticsCollectionEnabled(firebaseState.analytics, false) }
            dispatch(setIsAnalyticsActivated(false))

        },
        activatePerformance()   {

            logText(componentName, 'info', 'data', ' Activating performance')
            if (!navigator.doNotTrack && !window.doNotTrack) {

                if( firebaseState.performance !== null) {

                    firebaseState.performance.instrumentationEnabled = true
                    firebaseState.performance.dataCollectionEnabled = true

                }
                dispatch(setIsPerformanceActivated(true))

            }
            else { logText(componentName, 'info', 'data', ' Do Not Track has been activated') }

        },
        deactivatePerformance() {

            logText(componentName, 'info', 'data', ' Deactivating analytics')
            if( firebaseState.performance !== null) {

                firebaseState.performance.instrumentationEnabled = false
                firebaseState.performance.dataCollectionEnabled = false

            }
            dispatch(setIsPerformanceActivated(false))

        },
        isAnalyticsActivated :   metricsStore.isAnalyticsActivated,
        isPerformanceActivated : metricsStore.isPerformanceActivated,
    }), [metricsStore, logText, firebaseState.analytics, firebaseState.performance, setAnalyticsCollectionEnabled]);

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
