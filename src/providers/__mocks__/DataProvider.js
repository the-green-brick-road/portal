/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Menu provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @09 may 2023
# Latest revision: 09 may 2023
# ---------------------------------------------------- */

/* React includes */
import { createContext }       from 'react';

const context = createContext(null);

/* ----- Define provider values ---- */
var state = {
    seasons: [],
    posts: [],
};

function DataProvider(props) {

    const { children, seasons, posts } = props;

    /* ------ Defining behaviour ------- */
    state.seasons = seasons;
    state.posts = posts;

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );

}

function useData() { return state; };

export { useData, DataProvider };