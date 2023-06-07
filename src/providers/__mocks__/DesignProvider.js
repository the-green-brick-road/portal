/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Design provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @09 may 2023
# Latest revision: 09 may 2023
# ---------------------------------------------------- */

/* React includes */
import { createContext }       from 'react';

/* Material UI includes */
import { CssBaseline }                                 from '@mui/material';
import { ThemeProvider, createTheme }                  from '@mui/material/styles';

const context = createContext(null);

/* ----- Define provider values ---- */
var state = {
    isWebpSupported: true,
    isSliding:       false,
    isDarkMode:      false,
    images:          {},
    screen:          '',
    sizes:           {},
    setIsSliding:    jest.fn((value) => { state.isSliding = value }),
};

function DesignProvider(props) {

    const { children, isWebpSupported, screen, isDarkMode = false, isSliding = false, sizes, images = [], theme = {} } = props;

    /* ------ Defining behaviour ------- */
    var local_theme = {}
    if (Object.keys(theme).length !== 0) { local_theme = createTheme(theme); }

    state.isWebpSupported = isWebpSupported;
    state.screen          = screen;
    state.images          = {}
    state.sizes           = sizes;
    state.isSliding       = isSliding;
    state.isDarkMode      = isDarkMode;
    for (const image of images)
    {

        const rawext = image["raw"].split('.').pop();
        const webext = image["web"].split('.').pop();

        state.images[image.name] = {}
        state.images[image.name][rawext] = {}
        state.images[image.name][webext] = {}

        state.images[image.name][rawext]['small']           = {}
        state.images[image.name][rawext]['small']['img']    = require(`../../assets/small/${image.raw}`)
        state.images[image.name][rawext]['small']['width']  = `${sizes['small-width']}w`
        state.images[image.name][rawext]['medium']          = {}
        state.images[image.name][rawext]['medium']['img']   = require(`../../assets/medium/${image.raw}`)
        state.images[image.name][rawext]['medium']['width'] = `${sizes['medium-width']}w`
        state.images[image.name][rawext]['large']           = {}
        state.images[image.name][rawext]['large']['img']    = require(`../../assets/${image.raw}`)
        state.images[image.name][rawext]['large']['width']  = `${sizes['large-width']}w`

        state.images[image.name][webext]['small']           = {}
        state.images[image.name][webext]['small']['img']    = require(`../../assets/small/${image.web}`)
        state.images[image.name][webext]['small']['width']  = `${sizes['small-width']}w`
        state.images[image.name][webext]['medium']          = {}
        state.images[image.name][webext]['medium']['img']   = require(`../../assets/medium/${image.web}`)
        state.images[image.name][webext]['medium']['width'] = `${sizes['medium-width']}w`
        state.images[image.name][webext]['large']           = {}
        state.images[image.name][webext]['large']['img']    = require(`../../assets/${image.web}`)
        state.images[image.name][webext]['large']['width']  = `${sizes['large-width']}w`

        state.images[image.name]['default']= require(`../../assets/${image.raw}`)

    }

    /* ----------- Define HTML --------- */
    return (
        <ThemeProvider theme={local_theme}>
            <CssBaseline />
            <context.Provider value={state}>
                {children}
            </context.Provider>
        </ThemeProvider>
    );

}

function useDesign() { return state; };

export { useDesign, DesignProvider };