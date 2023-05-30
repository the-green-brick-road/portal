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
import { default as Home }       from '../views/home/Home';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { default as MockImage }  from '../components/__mocks__/Image';
jest.mock("../components", () => ({ Image: (props) => MockImage(props) }));
/* eslint-enable jest/no-mocks-import */

describe("Home view" ,() => {

    test('Should display home page', async () => {

        const view = render(
            <div>
                <Home/>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

})
