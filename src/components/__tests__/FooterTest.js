/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Footer component test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @29 may 2023
# Latest revision: 29 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM } from '@testing-library/react'
import { expect, test}       from '@jest/globals';

/* Component under test */
import { default as Footer } from '../../components/footer/Footer';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../../providers/__mocks__/DesignProvider';
import { default as MockImage }  from '../../components/__mocks__/Image';
jest.mock('../../providers', () => ({ useDesign: (() => { return mockUseDesign(); }) }));
jest.mock("../../components", () => ({ Image: (props) => MockImage(props) }));
/* eslint-enable jest/no-mocks-import */

describe("Footer component" ,() => {

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

    test('Should display a large footer', async () => {

        const view = render(
            <div>
                <MockDesignProvider isWebpSupported={true} screen='large' theme={theme}>
                    <Footer/>
                </MockDesignProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should display a thin footer', async () => {

        const view = render(
            <div>
                <MockDesignProvider isWebpSupported={true} screen='small' theme={theme}>
                    <Footer/>
                </MockDesignProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

})
