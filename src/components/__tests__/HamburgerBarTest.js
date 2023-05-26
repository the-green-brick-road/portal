/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Analytics Provider test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM, act, screen, fireEvent } from '@testing-library/react'
import { expect, test}                               from '@jest/globals';

/* Material UI includes */
import { Science }                                   from '@mui/icons-material/';

/* Component under test */
import { default as HamburgerBar }                   from '../../components/hamburgermenu/HamburgerBar';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useMenu as mockUseMenu, MenuProvider as MockMenuProvider } from '../../providers/__mocks__/MenuProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { default as MockImage }  from '../../components/__mocks__/Image';
jest.mock('../../providers', () => ({
    useLogging: (() => { return mockUseLogging(); }),
    useMenu: (()    => { return mockUseMenu(); }),
}));
jest.mock("../../components", () => ({ Image: (props) => MockImage(props) }));

/* eslint-enable jest/no-mocks-import */

describe("HamburgerBar component" ,() => {

    const entries = [
        {
            "id":     "item1",
            "path":   "/item1",
            "icon":   Science,
            "target": "_top",
        },
        {
            "id": "item2",
            "icon" : Science,
            "subitems": [
                {
                    "id": "subitem21",
                    "path": "/subitem21",
                    "target": "_top",
                },
                {
                    "id": "subitem22",
                    "path": "/subitem22",
                    "target": "_top",
                }
            ],
        }
    ];

    const theme = {
        "palette": {
            "common": {
                "black": "#444444",
                "white": "#555555",
            },
            "primary": {
                "main": "#666666",
                "light": "#666667",
                "dark": "#666668",
            },
            "secondary" : {
                "main": "#777777",
                "light": "#777778",
                "dark": "#777779",
            },
            "disabled" : {
                "main": "#888888",
                "light": "#888889",
                "dark": "#888880",
            },
            "text" : {
                "primary": "#111111",
                "secondary": "#222222",
                "disabled": "#333333",
            },
        },
        "direction": "ltr",
        "typography": {
            "h1": {
                "fontSize": "2.5rem",
                "color": "#111111",
                "textTransform": "uppercase",
                "fontFamily": "Roboto Condensed",
            },
            "h2": {
                "fontSize": "2rem",
                "color": "#222222",
                "textTransform": "lowercase",
                "fontFamily": "Roboto Condensed",
            },
            "body1": {
                "fontSize": "14px",
                "color": "black",
                "fontFamily": "Roboto",
                "position": "relative",
                "textAlign": "justify",
            },
        },
    }

    test('Should display a navigation bar', async () => {

        const view = render(
            <div>
                <MockLoggingProvider>
                    <MockMenuProvider entries={entries}>
                        <HamburgerBar height='84px' isNegative={false} theme={theme}/>
                    </MockMenuProvider>
                </MockLoggingProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should display a negative navigation bar', async () => {


        const view = render(
            <div>
                <MockLoggingProvider>
                    <MockMenuProvider entries={entries}>
                        <HamburgerBar height='84px' isNegative={true} theme={theme}/>
                    </MockMenuProvider>
                </MockLoggingProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false,highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should display a negative navigation event with no attributes', async () => {

        const view = render(
            <div>
                <MockLoggingProvider>
                    <MockMenuProvider entries={entries}>
                        <HamburgerBar />
                    </MockMenuProvider>
                </MockLoggingProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false,highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should open and close hamburger menu', async () => {

        const state = mockUseMenu();

        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(
                <div>
                    <MockLoggingProvider>
                        <MockMenuProvider entries={entries}>
                            <HamburgerBar height='84px' isNegative={true} theme={theme}/>
                        </MockMenuProvider>
                    </MockLoggingProvider>
                </div>
            );

        })

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false,highlight: false});
        expect(tree).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'open drawer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(state.setMenuState).toHaveBeenLastCalledWith(true)


    })

})
