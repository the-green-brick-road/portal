/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Home view component test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM, act }  from '@testing-library/react'
import { expect, test}             from '@jest/globals';

/* Component under test */
import { default as Blog }         from '../views/blog/Blog';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { default as MockImage }    from '../components/__mocks__/Image';
import { useData as mockUseData, DataProvider as MockDataProvider } from '../providers/__mocks__/DataProvider';
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../providers/__mocks__/DesignProvider';
jest.mock("../components", () => ({ Image: (props) => MockImage(props) }));
jest.mock('../providers', () => ({
    useData:    (() => { return mockUseData(); }),
    useDesign: (() => { return mockUseDesign(); }),
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

    test('Should display blog page', async () => {


        const Posts = [ { 'title' : 'post1', 'id' : '1', 'real': true, 'date' : { 'seconds' : 500000 } } , { 'title' : 'post2', 'id' : '2', 'real': true, 'date' : { 'seconds' : 400000 } }, { 'title' : 'post3', 'id' : '3', 'real': true, 'date' : { 'seconds' : 800000 } }, { 'title' : 'post4', 'id' : '4', 'real': true, 'date' : { 'seconds' : 0 } }, { 'title' : 'post5', 'id' : '5', 'real': true, 'date' : { 'seconds' : 0 } }, { 'title' : 'post6', 'id' : '6', 'real': true, 'date' : { 'seconds' : 1000000 } }, { 'title' : 'post7', 'id' : '7', 'real': true, 'date' : { 'seconds' : 450000 } }, { 'title' : 'post8', 'id' : '8', 'real': false, 'date' : { 'seconds' : 1200000 } } ];

        const view = render(
            <div>
                <MockDataProvider posts={Posts}>
                    <MockDesignProvider screen='large' theme={theme} sizes={sizes}>
                        <Blog/>
                    </MockDesignProvider>
                </MockDataProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

        await act(async () => { window.innerWidth = '1245px'; window.dispatchEvent(new Event('resize')) });
        const tree1 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree1).toMatchSnapshot();

        await act(async () => { window.innerWidth = '1147px'; window.dispatchEvent(new Event('resize')) });
        const tree2 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree2).toMatchSnapshot();

        await act(async () => { window.innerWidth = '784px'; window.dispatchEvent(new Event('resize')) });
        const tree3 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree3).toMatchSnapshot();

        await act(async () => { window.innerWidth = '500px'; window.dispatchEvent(new Event('resize')) });
        const tree4 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree4).toMatchSnapshot();


    })

})
