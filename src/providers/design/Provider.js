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
import { useMemo, useReducer, useEffect }              from 'react';

/* Material UI includes */
import { CssBaseline }                                 from '@mui/material';
import { ThemeProvider, createTheme }                  from '@mui/material/styles';

/* Portal includes */
import { useLogging, useConfiguration }                from '../../providers';

/* Local includes */
import { Context }                                     from './Context';
import { setIsSliding, setIsWebpSupported, setImages } from './store/actions';
import reducer                                         from './store/reducer';
import { useUseMediaQuery }                            from './MaterialHook';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'design' }  = props;
    const { logText }                          = useLogging();
    const { config }                           = useConfiguration();
    const { design = {} }                      = config;
    const useMediaQuery                        = useUseMediaQuery();
    const componentName = 'DesignProvider';
    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [designStore, dispatch] = useReducer(reducer, {
        isWebpSupported: false,   /* Are webp images supported ? */
        isSliding: false,
        images: [],
        ...savedState,
    });
    const isDesktop = useMediaQuery(`(min-width:${design.sizes['medium-width']}px)`);
    const sizes = design.sizes;
    const theme = createTheme(design.theme);

    useEffect(() => {

        /* Images loading */

        const images = {};
        for (const image of design.images)
        {

            const rawext = image["raw"].split('.').pop();
            const webext = image["web"].split('.').pop();

            images[image.name] = {}
            images[image.name][rawext] = {}
            images[image.name][webext] = {}

            images[image.name][rawext]['small']           = {}
            images[image.name][rawext]['small']['img']    = require(`../../assets/small/${image.raw}`)
            images[image.name][rawext]['small']['width']  = `${design.sizes['small-width']}w`
            images[image.name][rawext]['medium']          = {}
            images[image.name][rawext]['medium']['img']   = require(`../../assets/medium/${image.raw}`)
            images[image.name][rawext]['medium']['width'] = `${design.sizes['medium-width']}w`
            images[image.name][rawext]['large']           = {}
            images[image.name][rawext]['large']['img']    = require(`../../assets/${image.raw}`)
            images[image.name][rawext]['large']['width']  = `${design.sizes['large-width']}w`

            images[image.name][webext]['small']           = {}
            images[image.name][webext]['small']['img']    = require(`../../assets/small/${image.web}`)
            images[image.name][webext]['small']['width']  = `${design.sizes['small-width']}w`
            images[image.name][webext]['medium']          = {}
            images[image.name][webext]['medium']['img']   = require(`../../assets/medium/${image.web}`)
            images[image.name][webext]['medium']['width'] = `${design.sizes['medium-width']}w`
            images[image.name][webext]['large']           = {}
            images[image.name][webext]['large']['img']    = require(`../../assets/${image.web}`)
            images[image.name][webext]['large']['width']  = `${design.sizes['large-width']}w`

            images[image.name]['default']= require(`../../assets/${image.raw}`)

        }

        dispatch(setImages(images));

        /* Checking webp compliance */

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
        images:             designStore.images,
    }), [designStore, isDesktop]); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* ----------- Define HTML --------- */
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Context.Provider value={{isDesktop, sizes, ...state}}>
                {children}
            </Context.Provider>
        </ThemeProvider>
    );

}

export default Provider;
