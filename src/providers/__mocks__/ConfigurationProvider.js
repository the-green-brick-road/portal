/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Configuration provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @09 may 2023
# Latest revision: 09 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useContext, createContext } from 'react';

const context = createContext(null);

function ConfigurationProvider(props) {

    const { config, children } = props;

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={{config : config}}>
            {children}
        </context.Provider>
    );

}

function useConfiguration() { return useContext(context); }

export { useConfiguration, ConfigurationProvider };