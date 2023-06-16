/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Calendars provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 june 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { createContext }       from 'react';

const context = createContext(null);

/* ----- Define provider values ---- */
var state = { open: {} };

function CalendarsProvider(props) {

    const { children, open={} } = props;

    /* ------ Defining behaviour ------- */
    state.open = open;

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );

}

function useCalendars() { return state; };

export { useCalendars, CalendarsProvider };