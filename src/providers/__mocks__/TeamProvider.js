/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Team provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 june 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { createContext }       from 'react';

const context = createContext(null);

/* ----- Define provider values ---- */
var state = { team: {} };

function TeamProvider(props) {

    const { children, team = {} } = props;

    /* ------ Defining behaviour ------- */
    state.team = team;

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );

}

function useTeam() { return state; };

export { useTeam, TeamProvider };