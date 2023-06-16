/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Robot gallery view component test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM, act, fireEvent, screen } from '@testing-library/react'
import { expect, test}                               from '@jest/globals';

/* Component under test */
import { default as RobotGallery }                   from '../views/robotgallery/RobotGallery';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { default as MockImage }                      from '../components/__mocks__/Image';
import { useRobots as mockUseRobots, RobotsProvider as MockRobotsProvider } from '../providers/__mocks__/RobotsProvider';
import { useSeasons as mockUseSeasons, SeasonsProvider as MockSeasonsProvider } from '../providers/__mocks__/SeasonsProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../providers/__mocks__/LoggingProvider';
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../providers/__mocks__/DesignProvider';
jest.mock("../components", () => ({ Image: (props) => MockImage(props) }));
jest.mock('../providers', () => ({
    useRobots:    (() => { return mockUseRobots(); }),
    useSeasons:   (() => { return mockUseSeasons(); }),
    useLogging:   (() => { return mockUseLogging(); }),
    useDesign:   (() => { return mockUseDesign(); }),
}));
/* eslint-enable jest/no-mocks-import */

describe("RobotGallery view" ,() => {

    test('Should display robot gallery page', async () => {

        const Robots = {
            1 : { name : 'robot1', id : '1', type : 'attachment', season : '1', image : {raw : 'robot1', web : 'robot1' } } ,
            2 : { name : 'robot2', id : '2', type : 'jig', season : '2' },
            3 : { name : 'robot3', id : '3', type : 'base', season : '3' },
            5 : { name : 'robot5', id : '5', type : 'attachment', season : '1' },
            4 : { name : 'robot4', id : '4', type : 'attachment', season : '1' },
        };
        const Seasons = {
            1 : { name : 'season1', id : '1', start : {seconds : 500000} } ,
            2 : { name : 'season2', id : '2', start : {seconds : 400000} } ,
            3 : { name : 'season3', id : '3', start : {seconds : 600000} },
            4 : { name : 'season4', id : '4', start : {seconds : 550000} },
        };

        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(
                <div>
                    <MockRobotsProvider robots={Robots}>
                        <MockSeasonsProvider seasons={Seasons}>
                            <MockLoggingProvider>
                                <MockDesignProvider>
                                    <RobotGallery/>
                                </MockDesignProvider>
                            </MockLoggingProvider>
                        </MockSeasonsProvider>
                    </MockRobotsProvider>
                </div>
            )

        })


        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(1000);

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('checkbox', { name: 'season1' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree23 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree23).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('checkbox', { name: 'season2' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree3 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree3).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('checkbox', { name: 'season3' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree_empty = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree_empty).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('checkbox', { name: 'season1' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('checkbox', { name: 'season2' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('checkbox', { name: 'season3' }))}) // eslint-disable-line testing-library/no-unnecessary-act

        await act(async () => {fireEvent.click(screen.getByRole('checkbox', { name: 'jig' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const treeab = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(treeab).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('checkbox', { name: 'attachment' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const treeb = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(treeb).toMatchSnapshot();

        await act(async () => {fireEvent.click(screen.getByRole('checkbox', { name: 'base' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree_empty2 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree_empty2).toMatchSnapshot();

    })

})
