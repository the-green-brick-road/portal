/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Posts provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 june 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { createContext }       from 'react';

const context = createContext(null);

/* ----- Define provider values ---- */
var state = { posts: {} };

function PostsProvider(props) {

    const { children, posts = {} } = props;

    /* ------ Defining behaviour ------- */
    state.posts = posts;

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );

}

function usePosts() { return state; };

export { usePosts, PostsProvider };