/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Error boundary container to deal with portal errors
# NB : Should be placed after the log provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @09 may 2023
# Latest revision: 09 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }                                     from 'react';
import { ErrorBoundary as ReactErrorBoundary}           from 'react-error-boundary';

/* Sentry includes */
import { ErrorBoundary as SentryErrorBoundary}          from "@sentry/react";

/* Portal includes */
import { useLogging }                                   from "../../providers";

/* Local includes */
import Fallback                                         from './Fallback';

function ErrorBoundary(props) {

    /* --------- Gather inputs --------- */
    const { logText, onRender } = useLogging();
    const { children }          = props;
    const componentName = "ErrorBoundary";

    /* -- Deal with boundaries errors -- */
    const handleError = (err) => {

        logText(componentName, 'error', 'runtime', ` ${err}`)

    }

    /* ----------- Define HTML --------- */
    return (

        <Profiler id="ErrorBoundary" onRender={onRender}>
            {(process.env.NODE_ENV === 'production') && (

                <SentryErrorBoundary data-testid='error-boundary' fallback={<Fallback/>} showDialog>
                    {children}
                </SentryErrorBoundary>

            )}
            {(process.env.NODE_ENV !== 'production') && (

                <ReactErrorBoundary data-testid='error-boundary' FallbackComponent={Fallback} onError={handleError}>
                    {children}
                </ReactErrorBoundary>

            )}
        </Profiler>

    );

}

export default ErrorBoundary;
