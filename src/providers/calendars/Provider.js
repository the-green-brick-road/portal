/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Calendars provider to share calendars data between
# components
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 june 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useState, useEffect, Profiler }   from 'react';

/* Portal includes */
import { useLogging, useConfiguration }             from '../../providers';

/* Local includes */
import { Context }                                  from './Context';
import { useFetch }                                 from './RestHook';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'calendars' } = props;
    const { logText, onRender }                  = useLogging();
    const { config }                             = useConfiguration();
    const { firebase = {}, calendars = {} }      = config;
    const fetch                                  = useFetch();
    const componentName = 'CalendarsProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));

    const [calendarsStore, setCalendarsStore] = useState({
        open_update : "",
        open:  { },
        ...savedState,
    });

    useEffect(() => {

        logText(componentName,'debug','workflow',' Loading data --- BEGIN')

        /* Collect public calendar */
        fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendars['public']}/events?key=${firebase['api-key']}`)
            .then(response => response.json())
            .then(data => {

                if(data.updated !== calendarsStore.open_update) {

                    const local_state = {open: data.items, open_update: data.updated}
                    setCalendarsStore(local_state)
                    logText(componentName,'debug','workflow',' Loading data --- UPDATE')

                }

                logText(componentName,'debug','workflow',' Loading data --- END')

            });

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(calendarsStore))

    }, [calendarsStore, persistKey]);

    const state = useMemo(() => ({ open : calendarsStore.open }), [calendarsStore]);

    logText(componentName,'debug','workflow',' Rendering')

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
