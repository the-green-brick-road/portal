/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Terms & Conditions view component test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM, act }  from '@testing-library/react'
import { expect, test}             from '@jest/globals';

/* Component under test */
import { default as Terms }        from '../views/terms/Terms';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../providers/__mocks__/DesignProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../providers/__mocks__/LoggingProvider';
jest.mock('../providers', () => ({
    useDesign: (() => { return mockUseDesign(); }),
    useLogging: (() => { return mockUseLogging() }),
}));
/* eslint-enable jest/no-mocks-import */

describe("Blog view" ,() => {

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

    test('Should display terms and conditions page', async () => {

        const view = render(
            <div>
                <MockLoggingProvider>
                    <MockDesignProvider screen='large' theme={theme} sizes={sizes}>
                        <Terms/>
                    </MockDesignProvider>
                </MockLoggingProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

})
