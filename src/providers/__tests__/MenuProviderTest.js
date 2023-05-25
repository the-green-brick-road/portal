/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Logging Provider test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @09 may 2023
# Latest revision: 09 may 2023
# ---------------------------------------------------- */

/* React includes */
import { StrictMode, Fragment }                     from 'react';

/* Material UI includes */
import { Button }                                   from '@mui/material';

/* Test includes */
import { render, fireEvent, screen, act }           from '@testing-library/react'
import { expect, test }                             from '@jest/globals';

/* Component under test */
import { useMenu, MenuProvider }                    from '../../providers/menu';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
jest.mock('../analytics/FirebaseHook');
jest.mock('../../providers', () => ({
    useLogging:       (() => { return mockUseLogging(); }),
    useConfiguration: (() => { return mockUseConfiguration(); }),
}));
/* eslint-enable jest/no-mocks-import */

function MockMenuConsumer(props) {

    const { setMenuState, selectEntry, isItemSelected, isMenuOpen, entries } = useMenu();
    var calls = JSON.parse(localStorage.getItem('mock-menu-consumer'));
    if (calls === null) { calls = {open:0,select:0}; }

    if (calls['open'] % 2 === 0) { expect(isMenuOpen).toBe(false) }
    else                         { expect(isMenuOpen).toBe(true) }

    if(calls['select'] > 0) {

        if (calls['select'] % 2 === 0) {

            expect(isItemSelected[entries[0].id]).toBe(false)
            expect(isItemSelected[entries[1].id]).toBe(true)

        }
        else {

            expect(isItemSelected[entries[0].id]).toBe(true)
            expect(isItemSelected[entries[1].id]).toBe(false)

        }

    }
    expect(entries.length).toBe(2)
    expect(entries[0]).toEqual(
        {
            "id":     "item1",
            "path":   "/item1",
            "icon":   "Item1",
            "target": "_top",
        }
    )
    expect(entries[1]).toEqual(
        {
            "id": "item2",
            "icon" : "Item2",
            "subitems": [
                {
                    "id": "subitem21",
                    "path": "/subitem21",
                    "target": "_top",
                },
                {
                    "id": "cargo subitem22",
                    "path": "/subitem22",
                    "target": "_top",
                }
            ],
        }
    )

    const handleOpen = () => {

        setMenuState(!isMenuOpen)

        calls['open'] = calls['open'] + 1;
        localStorage.setItem('mock-menu-consumer', JSON.stringify(calls))

    }

    const handleSelect = () => {

        selectEntry(entries[calls['select'] % 2].id)

        calls['select'] = calls['select'] + 1;
        localStorage.setItem('mock-menu-consumer', JSON.stringify(calls))

    }

    const open_name = 'mock-menu-open-consumer'
    const select_name = 'mock-menu-select-consumer'

    return(
        <Fragment>
            <Button aria-label={open_name} onClick={handleOpen} />
            <Button aria-label={select_name} onClick={handleSelect} />
        </Fragment>
    )

};

describe("Menu provider" ,() => {

    afterEach(() => { localStorage.clear(); })

    test('Should load menu from configuration', async () => {

        const Config = {
            "menu": {
                "entries"   : [
                    {
                        "id":     "item1",
                        "path":   "/item1",
                        "icon":   "Item1",
                        "target": "_top",
                    },
                    {
                        "id": "item2",
                        "icon" : "Item2",
                        "subitems": [
                            {
                                "id": "subitem21",
                                "path": "/subitem21",
                                "target": "_top",
                            },
                            {
                                "id": "cargo subitem22",
                                "path": "/subitem22",
                                "target": "_top",
                            }
                        ],
                    }
                ],
            },
        }

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <StrictMode>
                    <div>
                        <MockConfigurationProvider config={Config}>
                            <MockLoggingProvider>
                                <MenuProvider>
                                    <MockMenuConsumer/>
                                </MenuProvider>
                            </MockLoggingProvider>
                        </MockConfigurationProvider>
                    </div>
                </StrictMode>

            );

        })

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-menu-open-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-menu-open-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-menu-open-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-menu-open-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-menu-select-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-menu-select-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-menu-select-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-menu-select-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act

    })


})
