/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Calendars Provider test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 june 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { StrictMode, Fragment }            from 'react';

/* Material UI includes */
import { Typography }                      from '@mui/material';

/* Test includes */
import { render, screen, act, cleanup }    from '@testing-library/react'
import { expect, test}                     from '@jest/globals';

/* Component under test */
import { useCalendars, CalendarsProvider } from '../../providers/calendars';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useFetch }                                                             from '../calendars/RestHook';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
jest.mock('../calendars/RestHook');
jest.mock('../../providers', () => ({
    useLogging:       (() => { return mockUseLogging(); }),
    useConfiguration: (() => { return mockUseConfiguration(); }),
}));
/* eslint-enable jest/no-mocks-import */

function MockCalendarsConsumer(props) {

    const { calendars_size, renders_before_test } = props;
    const { open } = useCalendars();
    var renders = JSON.parse(localStorage.getItem('mock-calendars-consumer'));

    renders = renders + 1;
    localStorage.setItem('mock-calendars-consumer', JSON.stringify(renders))

    if (renders >= renders_before_test) { expect(Object.entries(open).length).toBe(calendars_size)  }

    return(

        <Fragment>
            {Object.entries(open).map((item, index) => {

                const label = `mock-calendars-consumer-${index}`
                return(<Typography key={label} data-testid={label}>{item[0]}</Typography>)

            })}
            <Typography key='mock-calendars-consumer-renders' data-testid='mock-calendars-consumer-renders'>{renders}</Typography>
        </Fragment>

    )

};

describe("Calendars provider" ,() => {

    const Config = {
        "firebase" : { "api-key" : "AIzaSyDxkYnmt7ihsK7dA3hTY1Njk72XkV1qHrg"},
        "calendars" : {"public" : {"read" : "", "share":""}},
    }

    class Response {

        constructor(data, date) { this.data = {items:data, updated:date} }
        json() { return this.data }

    }

    const calendars_reference = { updated : "date1", events: {date1:{},date2:{}}}
    const calendars_updated = { updated : "date2", events: {date1:{},date2:{}}}
    var   calendars_current   = calendars_reference

    const delay = ms => new Promise(res => setTimeout(res, ms));

    afterEach(() => { localStorage.clear(); cleanup(); })

    test('Should collect and organize calendars', async () => {

        const mockFetch = jest.fn((name) => {

            return new Promise((resolve) => { resolve(new Response(calendars_current.events, calendars_current.updated)); });

        })
        useFetch.mockReturnValue(mockFetch);

        calendars_current   = calendars_reference;
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <CalendarsProvider >
                                <MockCalendarsConsumer calendars_size={2} renders_before_test={4}/>
                            </CalendarsProvider>
                        </MockLoggingProvider>
                    </MockConfigurationProvider>
                </StrictMode>

            );

        })

        await delay(3000);

        expect(mockFetch).toHaveBeenCalledTimes(2)

        expect(screen.getByTestId('mock-calendars-consumer-0').textContent).toBe('date1');
        expect(screen.getByTestId('mock-calendars-consumer-1').textContent).toBe('date2');

    })

    test('Should not update if data have not changed', async () => {

        const mockFetch = jest.fn((name) => {

            return new Promise((resolve) => { resolve(new Response(calendars_current.events, calendars_current.updated)); });

        })
        useFetch.mockReturnValue(mockFetch);

        // Component should render once on first load, and once after the useEffect that updated state from database
        calendars_current   = calendars_reference;
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <CalendarsProvider >
                            <MockCalendarsConsumer calendars_size={2} renders_before_test={2}/>
                        </CalendarsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-calendars-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        calendars_current = calendars_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <CalendarsProvider >
                            <MockCalendarsConsumer calendars_size={2} renders_before_test={3}/>
                        </CalendarsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-calendars-consumer-renders').textContent).toBe('3');
        cleanup();

    })

    test('Should update if data have been updated', async () => {

        const mockFetch = jest.fn((name) => {

            return new Promise((resolve) => { resolve(new Response(calendars_current.events, calendars_current.updated)); });

        })
        useFetch.mockReturnValue(mockFetch);

        // Component should render once on first load, and once after the useEffect that updated state from database
        calendars_current = calendars_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <CalendarsProvider>
                            <MockCalendarsConsumer calendars_size={2} renders_before_test={2}/>
                        </CalendarsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-calendars-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since a data have added
        calendars_current = calendars_updated
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <CalendarsProvider>
                            <MockCalendarsConsumer calendars_size={2} renders_before_test={4}/>
                        </CalendarsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-calendars-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        calendars_current = calendars_updated
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <CalendarsProvider>
                            <MockCalendarsConsumer calendars_size={2} renders_before_test={5}/>
                        </CalendarsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-calendars-consumer-renders').textContent).toBe('5');
        cleanup();


    })

    test('Should manage no data', async () => {

        const mockFetch = jest.fn((name) => {

            return new Promise((resolve) => { resolve(new Response({},"date1")); });

        })
        useFetch.mockReturnValue(mockFetch);

        calendars_current = []
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <CalendarsProvider >
                                <MockCalendarsConsumer calendars_size={0} renders_before_test={4}/>
                            </CalendarsProvider>
                        </MockLoggingProvider>
                    </MockConfigurationProvider>
                </StrictMode>

            );

        })

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(3000);

        expect(mockFetch).toHaveBeenCalledTimes(2)

    })


})

