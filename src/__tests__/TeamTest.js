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
import { render, prettyDOM }       from '@testing-library/react'
import { expect, test}             from '@jest/globals';

/* Component under test */
import { default as Team }       from '../views/team/Team';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { default as MockImage }    from '../components/__mocks__/Image';
import { useTeam as mockUseTeam, TeamProvider as MockTeamProvider } from '../providers/__mocks__/TeamProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../providers/__mocks__/LoggingProvider';
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../providers/__mocks__/DesignProvider';
jest.mock("../components", () => ({ Image: (props) => MockImage(props) }));
jest.mock('../providers', () => ({
    useTeam: (() => { return mockUseTeam(); }),
    useLogging: (() => { return mockUseLogging(); }),
    useDesign: (() => { return mockUseDesign(); }),
}));
/* eslint-enable jest/no-mocks-import */

describe("Team view" ,() => {

    test('Should display team page', async () => {

        const Members = {
            1 : {name : 'member1', id : '1', grade : 8, start:{seconds:4000000}, coding : 2, building : 2, description : 'member1'},
            2 : {name : 'member2', id : '2', grade : 7, start:{seconds:6000000}, coding : 1, building : 1, description : 'member2'},
            3 : {name : 'member3', id : '3', grade : -1, start:{seconds:3000000}, end : {seconds:2000000}, coding : 1, building : 2, description : 'member3'},
        }

        const view = render(
            <div>
                <MockLoggingProvider>
                    <MockDesignProvider>
                        <MockTeamProvider team={Members}>
                            <Team/>
                        </MockTeamProvider>
                    </MockDesignProvider>
                </MockLoggingProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

})
