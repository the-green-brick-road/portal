/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Config provider to share configuration between components
# -------------------------------------------------------
# Nadège LEMPERIERE, @19 may 2023
# Latest revision: 19 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo }    from 'react';

/* Local includes */
import { Context }                               from './Context';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { config, children }  = props;

    /* ----- Defining shared state ----- */
    const state = useMemo(() => ({ config }), [config]);

    /* ----------- Define HTML --------- */
    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );

}

export default Provider;
