/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Design provider to share website look between components
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 may 2023
# Latest revision: 15 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useReducer, useEffect }   from 'react';

/* Material UI includes */
import { CssBaseline }                      from '@mui/material';
import { ThemeProvider, createTheme }       from '@mui/material/styles';

/* Portal includes */
import { useLogging }                       from '../../providers';

/* Local includes */
import { Context }                          from './Context';
import { setIsSliding, setIsWebpSupported } from './store/actions';
import reducer                              from './store/reducer';
import { useUseMediaQuery }                 from './MaterialHook';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { config, children, persistKey = 'design' }  = props;
    const { design = {} }                              = config;
    const { logText }                                  = useLogging();
    const useMediaQuery                                = useUseMediaQuery();
    const componentName = 'DesignProvider';
    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [designStore, dispatch] = useReducer(reducer, {
        isWebpSupported: false,   /* Are webp images supported ? */
        isSliding: false,
        ...savedState,
    });
    const isDesktop = useMediaQuery(`(min-width:${design.sizes['medium-width']}px)`);
    const theme = createTheme(design.theme);

    useEffect(() => {

        function checkWebp() {

            return new Promise((resolve, reject) => {

                const image = new Image();
                image.addEventListener('error', () => resolve(false));
                image.addEventListener('load', () => resolve(image.width === 1));
                image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
                resolve(true);

            });

        }

        checkWebp()
            .then((is_supported) => dispatch(setIsWebpSupported(is_supported)))
            .catch((error) => dispatch(setIsWebpSupported(false)))

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(designStore))

    }, [designStore, persistKey]);

    const state = useMemo(() => ({
        setIsSliding(value) {

            if (value) { logText(componentName, 'log', 'design', 'Main window is sliding') }
            else       { logText(componentName, 'log', 'design', 'Main window is no longer sliding') }
            dispatch(setIsSliding(value))

        },
        isWebpSupported :   designStore.isWebpSupported,
        isSliding:          designStore.isSliding,
    }), [designStore, isDesktop]); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* ----------- Define HTML --------- */
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Context.Provider value={{isDesktop, ...state}}>
                {children}
            </Context.Provider>
        </ThemeProvider>
    );

}

export default Provider;
