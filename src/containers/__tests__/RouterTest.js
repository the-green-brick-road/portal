/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Router container test suite
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
import { useRobots as mockUseRobots, RobotsProvider as MockRobotsProvider } from '../../providers/__mocks__/RobotsProvider';
import { useSeasons as mockUseSeasons, SeasonsProvider as MockSeasonsProvider } from '../../providers/__mocks__/SeasonsProvider';
import { usePosts as mockUsePosts, PostsProvider as MockPostsProvider } from '../../providers/__mocks__/PostsProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { default as MockLayout }  from '../../containers/__mocks__/Layout';
jest.mock('../../providers', () => ({
    useConfiguration: (() => { return mockUseConfiguration(); }),
    useRobots: (() => { return mockUseRobots(); }),
    useSeasons: (() => { return mockUseSeasons(); }),
    usePosts: (() => { return mockUsePosts(); }),
    useLogging: (() => { return mockUseLogging(); }),
}));
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

        const Seasons = [ { 'name' : 'season1', 'id' : '1' } , { 'name' : 'season2', 'id' : '2' } ];
        const Posts = {
            1 : { title : 'post1', id : '1', real: true } ,
            2 : { title : 'post2', id : '2', real: true },
            3 : { title : 'post3', id : '3', real: false },
        };
        const Robots = [ { 'name' : 'robot1', 'id' : '1' } , { 'name' : 'robot2', 'id' : '2' } ];


        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <MockSeasonsProvider seasons={Seasons} >
                            <MockPostsProvider posts={Posts} >
                                <MockRobotsProvider robots={Robots} >
                                    <Suspense>
                                        <Router folder='/__mocks__' />
                                    </Suspense>
                                </MockRobotsProvider>
                            </MockPostsProvider>
                        </MockSeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            )

        })


        const delay = ms => new Promise(res => setTimeout(res, ms));

        await delay(3000);
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'target2' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree2 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree2).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'target3' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree3 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree3).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'season1' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree4 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree4).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'season2' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree5 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree5).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'post1' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree6 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree6).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'post2' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree7 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree7).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'target1' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree1 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree1).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'post3' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree_empty = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree_empty).toMatchSnapshot();



    })

})
