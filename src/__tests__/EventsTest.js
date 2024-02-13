/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Events view component test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM }       from '@testing-library/react'
import { expect, test}             from '@jest/globals';

/* Component under test */
import { default as Events }       from '../views/events/Events';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { default as MockImage }    from '../components/__mocks__/Image';
import { useCalendars as mockUseCalendars, CalendarsProvider as MockCalendarsProvider } from '../providers/__mocks__/CalendarsProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../providers/__mocks__/LoggingProvider';
jest.mock("../components", () => ({ Image: (props) => MockImage(props) }));
jest.mock('../providers', () => ({
    useCalendars: (() => { return mockUseCalendars(); }),
    useLogging: (() => { return mockUseLogging() }),
}));
/* eslint-enable jest/no-mocks-import */

describe("Events view" ,() => {

    test('Should display events page', async () => {

        const Open = [

            {'summary' : 'event1', 'location' : 'location1', start:{date : '2013-05-17'}, end : {dateTime:'2013-05-19T16:00:00-05:00', timeZone: 'America/New_York'}},
            {'summary' : 'event2', 'location' : 'location2', start:{date : '2012-05-16'}, end : {dateTime:'2012-05-16T16:00:00-05:00', timeZone: 'America/New_York'}},
            {'summary' : 'event3', 'location' : 'location3', start:{date : '2013-05-20'}, end : {date : '2013-05-20'}}

        ];

        const view = render(
            <div>
                <MockLoggingProvider>
                    <MockCalendarsProvider open={Open}>
                        <Events/>
                    </MockCalendarsProvider>
                </MockLoggingProvider>
            </div>
        );

        /*Remove current date display since it changes between each test */
        document.getElementById('now').remove(); /* eslint-disable-line testing-library/no-node-access */

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

})
