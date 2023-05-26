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
    isMenuOpen:      false,
    isItemSelected:  {},
    entries:          {},
    setMenuState:    jest.fn((value) => { state.isMenuOpen = value }),
    selectEntry:     jest.fn((entry, value) => {

        for (let i_entry = 0; i_entry < state.entries.length; i_entry += 1) {

            state.isItemSelected[state.entries[i_entry].id] = false;

        }
        state.isItemSelected[entry] = value

    }),
};

function MenuProvider(props) {

    const { children, entries, isOpen = false } = props;

    /* ------ Defining behaviour ------- */
    state.entries = entries;
    state.isMenuOpen = isOpen
    if(entries.length > 0) { state.selectEntry(entries[0].id,false) }

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );

}

function useMenu() { return state; };

export { useMenu, MenuProvider };