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
import { useMemo, useReducer, useEffect, useState }                 from 'react';

/* Portal includes */
import { useLogging }                                               from '../../providers';

/* Local includes */
import { Context }                                                  from './Context';
import { useInitializeApp, useIsSupported, useGetAnalytics}         from './FirebaseHook';
import { useGetPerformance, useSetAnalyticsCollectionEnabled}       from './FirebaseHook';
import { setIsAnalyticsActivated, setIsPerformanceActivated }       from './store/actions';
import reducer                                                      from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { config, children, persistKey = 'analytics' } = props;
    const { metrics = {}}                                = config;
    const { logText }                                    = useLogging();
    const isSupported = useIsSupported();
    const setAnalyticsCollectionEnabled = useSetAnalyticsCollectionEnabled();
    const getAnalytics = useGetAnalytics();
    const getPerformance = useGetPerformance();
    const initializeApp = useInitializeApp();
    const componentName = 'AnalyticsProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [metricsStore, dispatch] = useReducer(reducer, {
        isAnalyticsActivated:  false,   /* Is analytics report activated ? */
        isPerformanceActivated:  false, /* Is performance report activated ? */
        ...savedState,
    });

    const [firebase, setFirebase] = useState({analytics : null, performance : null})

    useEffect(() => {

        isSupported().then((isSupported) => {

            if (isSupported) {

                logText(componentName, 'info', 'data', ' Analytics exports are supported')
                const firebase_config = {
                    apiKey:              metrics.firebase['api-key'],
                    authDomain:          metrics.firebase['auth-domain'],
                    projectId:           metrics.firebase['project-id'],
                    storageBucket:       metrics.firebase['storage-bucket'],
                    messagingSenderId:   metrics.firebase['messaging-sender-id'],
                    appId:               metrics.firebase['app-id'],
                    measurementId:       metrics.firebase['measurement-id'],
                };

                const app               = initializeApp(firebase_config);
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
            if( firebase.analytics !== null ) { setAnalyticsCollectionEnabled(firebase.analytics, true) }
            dispatch(setIsAnalyticsActivated(true))

        },
        deactivateAnalytics() {

            logText(componentName, 'info', 'data', ' Deactivating analytics')
            if( firebase.analytics !== null ) { setAnalyticsCollectionEnabled(firebase.analytics, false) }
            dispatch(setIsAnalyticsActivated(false))

        },
        activatePerformance()   {

            logText(componentName, 'info', 'data', ' Activating performance')
            if( firebase.performance !== null) {

                firebase.performance.instrumentationEnabled = true
                firebase.performance.dataCollectionEnabled = true

            }
            dispatch(setIsPerformanceActivated(true))

        },
        deactivatePerformance() {

            logText(componentName, 'info', 'data', ' Deactivating analytics')
            if( firebase.performance !== null) {

                firebase.performance.instrumentationEnabled = false
                firebase.performance.dataCollectionEnabled = false

            }
            dispatch(setIsPerformanceActivated(false))

        },
        isAnalyticsActivated :   metricsStore.isAnalyticsActivated,
        isPerformanceActivated : metricsStore.isPerformanceActivated,
    }), [metricsStore, logText, firebase.analytics, firebase.performance, setAnalyticsCollectionEnabled]);

    /* ----------- Define HTML --------- */
    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );

}

export default Provider;
