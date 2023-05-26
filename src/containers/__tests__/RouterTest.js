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

/* React includes */
import { Suspense }                                  from 'react';

/* Test includes */
import { render, fireEvent, screen, act, prettyDOM } from '@testing-library/react'
import { expect, test}                               from '@jest/globals';

/* Component under test */
import { default as Router }                         from '../../containers/router/Router';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
import { default as MockLayout }  from '../../containers/__mocks__/Layout';
jest.mock('../../providers', () => ({ useConfiguration: (() => { return mockUseConfiguration(); }) }));
jest.mock("../../containers", () => ({ Layout: (props) => MockLayout(props) }));

/* eslint-enable jest/no-mocks-import */

describe("Router component" ,() => {

    test('Should build correct routes', async () => {

        const Config = {
            "routes": [
                {
                    "path": "/",
                    "element": "Target1",
                },
                {
                    "path": "/target2",
                    "element": "Target2",
                },
                {
                    "path": "/target3",
                    "element": "Target3",
                }
            ],
        };

        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(

                <MockConfigurationProvider config={Config}>
                    <Suspense>
                        <Router folder='/__mocks__' />
                    </Suspense>
                </MockConfigurationProvider>

            )

        })


        const delay = ms => new Promise(res => setTimeout(res, ms));

        await delay(1000);
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'target2' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree2 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree2).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'target3' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree3 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree3).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'target1' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree1 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree1).toMatchSnapshot();

    })

})
