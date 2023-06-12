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
import { render, prettyDOM }     from '@testing-library/react'
import { expect, test}           from '@jest/globals';

/* Component under test */
import { default as Mission }    from '../views/mission/Mission';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { default as MockImage }  from '../components/__mocks__/Image';
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../providers/__mocks__/DesignProvider';
jest.mock("../components", () => ({ Image: (props) => MockImage(props) }));
jest.mock('../providers', () => ({ useDesign: (() => { return mockUseDesign(); }) }));
/* eslint-enable jest/no-mocks-import */

describe("Mission view" ,() => {

    const sizes = {
        "small-width"          : 200,
        "medium-width"         : 400,
        "large-width"          : 800,
        "menu-height"          : 80,
        "margin"               : 10,
        "hamburger-height"     : 40,
    }

    test('Should display mission page', async () => {

        const view = render(
            <div>
                <MockDesignProvider sizes={sizes}>
                    <Mission/>
                </MockDesignProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

})