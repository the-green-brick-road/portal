/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# NavigationBar component test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, act, screen, fireEvent, prettyDOM }  from '@testing-library/react'
import { expect, test}                                from '@jest/globals';

/* Material UI includes */
import { Science }                                    from '@mui/icons-material/';

/* Component under test */
import { default as NavigationBar }                   from '../../components/navigationbar/NavigationBar';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useMenu as mockUseMenu, MenuProvider as MockMenuProvider } from '../../providers/__mocks__/MenuProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { default as MockImage }   from '../../components/__mocks__/Image';
import { default as MockRouter }  from '../../containers/__mocks__/Router';
import { default as MockLayout }  from '../../containers/__mocks__/Layout';
jest.mock('../../providers', () => ({
    useLogging: (() => { return mockUseLogging(); }),
    useMenu: (()    => { return mockUseMenu(); }),
}));
jest.mock("../../components", () => ({ Image: (props) => MockImage(props) }));
jest.mock("../../containers", () => ({
    Router: (props) => MockRouter(props),
    Layout: (props) => MockLayout(props),
}));

/* eslint-enable jest/no-mocks-import */

function MockLayoutWithBar() {

    const theme = {
        "palette": {
            "common": {
                "black": "#444444",
                "white": "#555555",
            },
            "primary": { "main": "#666666" },
            "secondary" : { "main": "#777777" },
        },
        "typography" : { "button": { "fontSize": "14px" } },
    };

    return(
        <MockLayout>
            <NavigationBar height='84px' isNegative={true} theme={theme}/>
        </MockLayout>
    )

};

describe("NavigationBar component" ,() => {


    const entries = [
        {
            "id":     "item1",
            "path":   "/",
            "icon":   Science,
            "target": "_top",
        },
        {
            "id": "item2",
            "icon" : Science,
            "subitems": [
                {
                    "id": "subitem21",
                    "path": "/test1",
                    "target": "_top",
                },
                {
                    "id": "subitem22",
                    "path": "/test2",
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
            "button": {
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
                        <NavigationBar height='84px' isNegative={false} theme={theme}/>
                    </MockMenuProvider>
                </MockLoggingProvider>
            </div>

        )
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false,highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should display a negative navigation bar', async () => {


        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockMenuProvider entries={entries}>
                        <NavigationBar height='84px' isNegative={true} theme={theme}/>
                    </MockMenuProvider>
                </MockLoggingProvider>
            </div>

        )
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false,highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should select menu item on click', async () => {


        const state = mockUseMenu();

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <div>
                    <MockLoggingProvider>
                        <MockMenuProvider entries={entries}>
                            <MockRouter layout={MockLayoutWithBar} />
                        </MockMenuProvider>
                    </MockLoggingProvider>
                </div>

            )

        })


        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(1000);

        await act(async () => {fireEvent.click(screen.getByRole('link', { name: 'item1' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(state.selectEntry).toHaveBeenLastCalledWith('item1', false)
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'item2' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(state.selectEntry).toHaveBeenLastCalledWith('item2', true)

        /* eslint-disable testing-library/no-node-access*/
        expect(screen.getByText('item1').closest('a').getAttribute('href')).toBe('/')
        expect(screen.getByText('subitem21').closest('a').getAttribute('href')).toBe('/test1')
        expect(screen.getByText('subitem22').closest('a').getAttribute('href')).toBe('/test2')
        /* eslint-enable testing-library/no-node-access*/


    })

})
