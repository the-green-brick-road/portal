/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Authentication provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @26 june 2023
# Latest revision: 26 june 2023
# ---------------------------------------------------- */

/* React includes */
import { useContext, createContext } from 'react';

const context = createContext(null);

/* ----- Define provider values ---- */
var state = {
    ui: {
        start:       jest.fn(() => {})
    },
    config:          false,
    isAuthenticated: false,
    isOpen:          false,
    shallRefresh:    false,
    user:            { email:'test@test.org', role:'dummy' },
    registration:    null,
    error:           "",
    signOut:         jest.fn(() => { state.isAuthenticated = false }),
    setIsOpen:       jest.fn((value) => { state;isOpen = value }),
    resetError:      jest.fn(() => { state.error = "" }),
    message:         "",
    resetMessage:    jest.fn(() => { state.message = "" }),
    shallRefresh:    true
};


function AuthProvider(props) {

    const { children, isAuthenticated = false, isOpen = false, registration = null, error = "" } = props;

    state.isAuthenticated = isAuthenticated
    state.isOpen          = isOpen
    state.registration    = registration
    state.error           = error

    /* ----------- Define HTML --------- */
    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );

}

function useAuth() { return state; }

export { useAuth, AuthProvider };