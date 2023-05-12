/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Logging provider to share state and update between
# components
# -------------------------------------------------------
# Nadège LEMPERIERE, @03 may 2023
# Latest revision: 08 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useReducer, useEffect }               from 'react';

/* Local includes */
import { Context }                                      from './Context';
import { useInit, useCaptureMessage, useSetTag }        from './SentryHook';
import { useLog, useError, useWarn }                    from './ConsoleHook';
import { setIsLoggingActivated }                        from './store/actions';
import reducer                                          from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { config, children, persistKey = 'logging' } = props;
    const { logging = {} }                             = config;
    const init           = useInit();
    const captureMessage = useCaptureMessage();
    const setTag         = useSetTag();
    const log            = useLog();
    const error          = useError();
    const warn           = useWarn();
    const componentName = 'LoggingProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [logger, dispatch] = useReducer(reducer, {
        isLoggingActivated:  (process.env.NODE_ENV === 'production'? false : true),   /* Is logging activated ? */
        ...savedState,
    });

    /* ----- Define log in development - */
    const logProduction = (component, level, topic, message) => {


        if ((logging.settings.levels.indexOf(level) <= logging.settings.levels.indexOf(logging.settings.level)) &&
            (logger.isLoggingActivated)) { /* If event level shall be logged */

            if(level === 'error' || level === 'warning' || level === 'fatal' ) {

                captureMessage(
                    `${message}`, {
                        level: level,
                        tags: { section: topic, component: component },
                    }
                )

            }
            else if (
                (logging.settings.components.indexOf(component) > -1) ||
                (logging.settings.components.indexOf('all') > -1)
            ) {

                if(level === 'info') {

                    captureMessage(
                        `${message}`, {
                            level: level,
                            tags: { section: topic, component: component },
                        }
                    )

                }
                /* Other logging level are not stored --- too much noise */

            }

        }

    };

    const logDevelopment = (component, level, topic, message) => {

        if ((logging.settings.levels.indexOf(level) <= logging.settings.levels.indexOf(logging.settings.level)) &&
            (logger.isLoggingActivated)) { /* If event level shall be logged */

            if (
                (logging.settings.components.indexOf(component) > -1) ||
                (logging.settings.components.indexOf('all') > -1))
            {

                if(level === 'fatal') { error(`${component} - ${topic} -${message}`)}
                else if(level === 'error') { error(`${component} - ${topic} -${message}`)}
                else if(level === 'warning') { warn(`${component} - ${topic} -${message}`)}
                else { log(`${component} - ${level} - ${topic} -${message}`) }

            }

        }

    };

    /* ------- Initialize sentry ------- */
    useEffect(() => {

        if(process.env.NODE_ENV === 'production') {

            init({

                dsn: config.logging.sentry.dsn,
                tracesSampleRate: 0.1,
                replaysSessionSampleRate: 0.1,
                replaysOnErrorSampleRate: 1.0,

            })

            setTag("release", process.env.REACT_APP_VERSION)

        }

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(logger))

    }, [logger, persistKey]);

    const state = useMemo(() => ({

        activateLogging()   {

            if( process.env.NODE_ENV === 'production') { logProduction(componentName, 'info', 'data', ' Activating logging')}
            else if( process.env.NODE_ENV === 'development') { logDevelopment(componentName, 'info', 'data', ' Activating logging')}
            dispatch(setIsLoggingActivated(true))

        },
        deactivateLogging() { dispatch(setIsLoggingActivated(false)) },
        logText(component, level, topic, message)   {

            if( process.env.NODE_ENV === 'production') { logProduction(component, level, topic, message)}
            else if( process.env.NODE_ENV === 'development') { logDevelopment(component, level, topic, message)}

        },
        isLoggingActivated :   logger.isLoggingActivated,
    }), [logger]); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* ----------- Define HTML --------- */
    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );

}

export default Provider;
