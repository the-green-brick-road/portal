/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Seasons provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 june 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { createContext }       from 'react';

const context = createContext(null);

/* ----- Define provider values ---- */
var state = { seasons: {} };

function SeasonsProvider(props) {

    const { children, seasons = {} } = props;

    /* ------ Defining behaviour ------- */
    state.seasons = seasons;

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );

}

function useSeasons() { return state; };

export { useSeasons, SeasonsProvider };