/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Layout container test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM}  from '@testing-library/react'
import { expect, test}       from '@jest/globals';

/* Material UI includes */
import { Science }           from '@mui/icons-material/';

/* Component under test */
import { default as Layout } from '../../containers/layout/Layout';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useMenu as mockUseMenu, MenuProvider as MockMenuProvider } from '../../providers/__mocks__/MenuProvider';
import { useAnalytics as mockUseAnalytics, AnalyticsProvider as MockAnalyticsProvider } from '../../providers/__mocks__/AnalyticsProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../../providers/__mocks__/DesignProvider';
import { default as MockNavigationBar }  from '../../components/__mocks__/NavigationBar';
import { default as MockHamburgerBar }   from '../../components/__mocks__/HamburgerBar';
import { default as MockImage }          from '../../components/__mocks__/Image';
import { default as MockHamburgerMenu }  from '../../components/__mocks__/HamburgerMenu';
import { default as MockFooter }         from '../../components/__mocks__/Footer';
import { default as MockCookies }        from '../../components/__mocks__/Cookies';
import { default as MockRouter }         from '../../containers/__mocks__/Router';
jest.mock('../../providers', () => ({
    useLogging: (() => { return mockUseLogging(); }),
    useMenu: (() => { return mockUseMenu(); }),
    useDesign: (() => { return mockUseDesign(); }),
    useAnalytics: (() => { return mockUseAnalytics(); }),
}));
jest.mock("../../components", () => ({
    Image: (props) => MockImage(props),
    NavigationBar: (props) => MockNavigationBar(props),
    HamburgerBar: (props) => MockHamburgerBar(props),
    HamburgerMenu: (props) => MockHamburgerMenu(props),
    Footer: (props) => MockFooter(props),
    Cookies: (props) => MockCookies(props),
}));
jest.mock("../../containers", () => ({ Router: (props) => MockRouter(props) }));
/* eslint-enable jest/no-mocks-import */

describe("Layout container" ,() => {

    const sizes = {
        "small-width"          : 200,
        "medium-width"         : 400,
        "large-width"          : 800,
        "menu-height"          : 80,
        "margin"               : 10,
        "hamburger-height"     : 40,
    }

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
                    "id": "cargo subitem22",
                    "path": "/subitem22",
                    "target": "_top",
                }
            ],
        }
    ];

    test('Should provide required design when not sliding for large screens', async () => {

        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockAnalyticsProvider>
                        <MockDesignProvider hasAcceptedCookies={true} screen='large' theme={theme} sizes={sizes}>
                            <MockMenuProvider entries={entries}>
                                <MockRouter layout={Layout}/>
                            </MockMenuProvider>
                        </MockDesignProvider>
                    </MockAnalyticsProvider>
                </MockLoggingProvider>
            </div>

        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should provide required design when sliding for large screen', async () => {

        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockAnalyticsProvider>
                        <MockDesignProvider hasAcceptedCookies={true} screen='large' theme={theme} sizes={sizes} isSliding={true}>
                            <MockMenuProvider entries={entries}>
                                <MockRouter layout={Layout}/>
                            </MockMenuProvider>
                        </MockDesignProvider>
                    </MockAnalyticsProvider>
                </MockLoggingProvider>
            </div>

        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })
    test('Should provide required design when not sliding for medium screens', async () => {

        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockAnalyticsProvider>
                        <MockDesignProvider hasAcceptedCookies={true} screen='medium' theme={theme} sizes={sizes}>
                            <MockMenuProvider entries={entries}>
                                <MockRouter layout={Layout}/>
                            </MockMenuProvider>
                        </MockDesignProvider>
                    </MockAnalyticsProvider>
                </MockLoggingProvider>
            </div>

        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should provide required design when sliding for medium screen', async () => {

        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockAnalyticsProvider>
                        <MockDesignProvider hasAcceptedCookies={true} screen='medium' theme={theme} sizes={sizes} isSliding={true}>
                            <MockMenuProvider entries={entries}>
                                <MockRouter layout={Layout}/>
                            </MockMenuProvider>
                        </MockDesignProvider>
                    </MockAnalyticsProvider>
                </MockLoggingProvider>
            </div>

        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should provide required design when not sliding for small screens', async () => {

        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockAnalyticsProvider>
                        <MockDesignProvider hasAcceptedCookies={true} screen='small' theme={theme} sizes={sizes}>
                            <MockMenuProvider entries={entries}>
                                <MockRouter layout={Layout}/>
                            </MockMenuProvider>
                        </MockDesignProvider>
                    </MockAnalyticsProvider>
                </MockLoggingProvider>
            </div>

        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should provide required design when sliding for small screen', async () => {

        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockAnalyticsProvider>
                        <MockDesignProvider hasAcceptedCookies={true} screen='small' theme={theme} sizes={sizes} isSliding={true}>
                            <MockMenuProvider entries={entries}>
                                <MockRouter layout={Layout}/>
                            </MockMenuProvider>
                        </MockDesignProvider>
                    </MockAnalyticsProvider>
                </MockLoggingProvider>
            </div>

        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })


    test('Should provide required design when not sliding and menu open for small screens', async () => {

        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockAnalyticsProvider>
                        <MockDesignProvider hasAcceptedCookies={true} screen='small' theme={theme} sizes={sizes}>
                            <MockMenuProvider entries={entries} isOpen={true}>
                                <MockRouter layout={Layout}/>
                            </MockMenuProvider>
                        </MockDesignProvider>
                    </MockAnalyticsProvider>
                </MockLoggingProvider>
            </div>

        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should provide required design when sliding and menu open for small screen', async () => {

        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockAnalyticsProvider>
                        <MockDesignProvider hasAcceptedCookies={true} screen='small' theme={theme} sizes={sizes} isSliding={true}>
                            <MockMenuProvider entries={entries} isOpen={true}>
                                <MockRouter layout={Layout}/>
                            </MockMenuProvider>
                        </MockDesignProvider>
                    </MockAnalyticsProvider>
                </MockLoggingProvider>
            </div>

        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should hide menu when cookies are not activated', async () => {

        const view = render(

            <div>
                <MockLoggingProvider>
                    <MockAnalyticsProvider >
                        <MockDesignProvider screen='small' theme={theme} sizes={sizes} isSliding={true} hasAcceptedCookies={false}>
                            <MockMenuProvider entries={entries} isOpen={true}>
                                <MockRouter layout={Layout}/>
                            </MockMenuProvider>
                        </MockDesignProvider>
                    </MockAnalyticsProvider>
                </MockLoggingProvider>
            </div>

        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

})
