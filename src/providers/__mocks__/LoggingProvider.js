/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Logging provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @09 may 2023
# Latest revision: 09 may 2023
# ---------------------------------------------------- */

/* React includes */
import { createContext }       from 'react';

const context = createContext(null);

/* ----- Define provider values ---- */
var state = {
    isLoggingActivated : true,
    logText: jest.fn((component, level, topic, message) => {  console.log(`${component} - ${level} - ${topic} -${message}`) }),
};

function LoggingProvider(props) {

    const { children } = props;

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );

}

function useLogging() { return state; };

export { useLogging, LoggingProvider };