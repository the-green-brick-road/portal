/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Menu provider to share state and update between
# components
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useReducer, useEffect }   from 'react';

/* Portal includes */
import { useLogging, useConfiguration }     from '../../providers';

/* Local includes */
import { Context }                          from './Context';
import { setIsMenuOpen, setIsItemSelected } from './store/actions';
import reducer                              from './store/reducer';


function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'menu' } = props;
    const { logText }                       = useLogging();
    const { config }                        = useConfiguration();
    const componentName = 'MenuProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [menuStore, dispatch] = useReducer(reducer, {
        isMenuOpen:      false,   /* Is menu open (for hamburger menu) ? */
        isItemSelected:  {}, /* Is a menu item selected ? */
        ...savedState,
    });

    useEffect(() => {

        const selected = {};
        for (let i_entry = 0; i_entry < config.menu.entries.length; i_entry += 1) {

            selected[config.menu.entries[i_entry].id] = false;

        }

        dispatch(setIsItemSelected(selected))

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(menuStore))

    }, [menuStore, persistKey]);

    const state = useMemo(() => ({
        setMenuState(value)   {

            logText(componentName, 'info', 'workflow', ` Setting Menu Opening State : ${value}`)
            dispatch(setIsMenuOpen(value))

        },
        selectEntry(entry, value = true)   {

            logText(componentName, 'info', 'workflow', ` Selecting entry : ${value}`)
            const items = {};

            const array = Object.entries(menuStore.isItemSelected);
            for (let i_entry = 0; i_entry < array.length; i_entry += 1) { items[array[i_entry][0]] = false; }
            items[entry] = value;
            dispatch(setIsItemSelected(items));

        },
        isMenuOpen: menuStore.isMenuOpen,
        isItemSelected: menuStore.isItemSelected,
        entries: config.menu.entries,
    }), [menuStore, logText, config.menu]);

    /* ----------- Define HTML --------- */
    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );

}

export default Provider;
