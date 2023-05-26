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
import {StrictMode }                                from 'react';

/* Material UI includes */
import { Button }                                   from '@mui/material';

/* Test includes */
import { render, fireEvent, screen, act }           from '@testing-library/react'
import { expect, test }                             from '@jest/globals';

/* Component under test */
import { useLogging, LoggingProvider }              from '../../providers/logging';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useInit, useCaptureMessage, useSetTag }    from '../logging/SentryHook';
import { useLog, useError, useWarn }                from '../logging/ConsoleHook';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
jest.mock('../logging/SentryHook');
jest.mock('../logging/ConsoleHook');
jest.mock('../../providers', () => ({ useConfiguration: (() => { return mockUseConfiguration(); }) }));
/* eslint-enable jest/no-mocks-import */

function MockLoggingConsumer(props) {

    const { mode, index } = props;
    const { activateLogging, deactivateLogging, isLoggingActivated, logText } = useLogging();
    var calls = JSON.parse(localStorage.getItem('mock-logging-consumer'));
    if (calls === null) { calls = 0; }

    if (mode === 'production')
    {

        if (calls % 2 === 0) { expect(isLoggingActivated).toBe(false) }
        else                 { expect(isLoggingActivated).toBe(true) }

    }
    else
    {

        if (calls % 2 === 0) { expect(isLoggingActivated).toBe(true) }
        else                 { expect(isLoggingActivated).toBe(false) }

    }

    logText('test','fatal','test','test')
    logText('test','error','test','test')
    logText('test','warning','test','test')
    logText('test','info','test','test')
    logText('test','debug','test','test')
    logText('test','log','test','test')

    const handleClick = () => {

        if (isLoggingActivated) { deactivateLogging() }
        else                    { activateLogging()   }

        calls = calls + 1;
        localStorage.setItem('mock-logging-consumer', JSON.stringify(calls))

    }

    const button_name = `mock-logging-consumer-${index}`

    return(
        <Button aria-label={button_name} onClick={handleClick} />
    )

};

const developmentTest = async (level, components, stats, index) => {

    const Config = {
        "logging": {
            "sentry"   : { "dsn" : "https://5383c643fb7f49c8ae0b87c5a00a1f7b@o4505149124640768.ingest.sentry.io/4505149126148096" },
            "settings" : {
                "components": components,
                "levels":     ["fatal", "error", "warning", "info", "debug", "log"],
                "level":      level,
            },
        },
    }

    const mockUseInit = jest.fn((conf) => {  });
    useInit.mockReturnValue(mockUseInit);
    const mockUseCaptureMessage = jest.fn((message, options) => {});
    useCaptureMessage.mockReturnValue(mockUseCaptureMessage);
    const mockUseSetTag = jest.fn((name, value) => { });
    useSetTag.mockReturnValue(mockUseSetTag);
    const mockUseLog = jest.fn((text) => { });
    useLog.mockReturnValue(mockUseLog);
    const mockUseError = jest.fn((text) => { });
    useError.mockReturnValue(mockUseError);
    const mockUseWarn = jest.fn((text) => { });
    useWarn.mockReturnValue(mockUseWarn);

    await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

        render(

            <div>
                <MockConfigurationProvider config={Config}>
                    <LoggingProvider>
                        <MockLoggingConsumer mode={process.env.NODE_ENV} index={index}/>
                    </LoggingProvider>
                </MockConfigurationProvider>
            </div>

        );

    })

    const button_name = `mock-logging-consumer-${index}`

    expect(mockUseError).toHaveBeenCalledTimes(stats.error)
    expect(mockUseWarn).toHaveBeenCalledTimes(stats.warning)
    expect(mockUseLog).toHaveBeenCalledTimes(stats.log)

    await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

    expect(mockUseError).toHaveBeenCalledTimes(stats.error)
    expect(mockUseWarn).toHaveBeenCalledTimes(stats.warning)
    expect(mockUseLog).toHaveBeenCalledTimes(stats.log)

    await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

    expect(mockUseError).toHaveBeenCalledTimes(stats.error * 2)
    expect(mockUseWarn).toHaveBeenCalledTimes(stats.warning * 2)
    expect(mockUseLog).toHaveBeenCalledTimes(stats.log * 2)

    expect(mockUseInit).toHaveBeenCalledTimes(0)
    expect(mockUseCaptureMessage).toHaveBeenCalledTimes(0)
    expect(mockUseSetTag).toHaveBeenCalledTimes(0)


}

const productionTest = async (level, components, stats, index) => {

    process.env.NODE_ENV = 'production'

    const Config = {
        "logging": {
            "sentry"   : { "dsn" : "https://5383c643fb7f49c8ae0b87c5a00a1f7b@o4505149124640768.ingest.sentry.io/4505149126148096" },
            "settings" : {
                "components": components,
                "levels":     ["fatal", "error", "warning", "info", "debug", "log"],
                "level":      level,
            },
        },
    }



    const mockUseInit = jest.fn((conf) => {  });
    useInit.mockReturnValue(mockUseInit);
    const mockUseCaptureMessage = jest.fn((message, options) => { });
    useCaptureMessage.mockReturnValue(mockUseCaptureMessage);
    const mockUseSetTag = jest.fn((name, value) => { });
    useSetTag.mockReturnValue(mockUseSetTag);
    const mockUseLog = jest.fn((text) => { });
    useLog.mockReturnValue(mockUseLog);
    const mockUseError = jest.fn((text) => { });
    useError.mockReturnValue(mockUseError);
    const mockUseWarn = jest.fn((text) => { });
    useWarn.mockReturnValue(mockUseWarn);

    await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

        render(

            <div>
                <MockConfigurationProvider config={Config}>
                    <LoggingProvider>
                        <MockLoggingConsumer mode={process.env.NODE_ENV} index={index}/>
                    </LoggingProvider>
                </MockConfigurationProvider>
            </div>

        );

    })

    const button_name = `mock-logging-consumer-${index}`

    expect(mockUseInit).toHaveBeenCalledTimes(1)
    expect(mockUseCaptureMessage).toHaveBeenCalledTimes(0)
    expect(mockUseSetTag).toHaveBeenCalledTimes(1)

    await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

    expect(mockUseInit).toHaveBeenCalledTimes(1)
    expect(mockUseCaptureMessage).toHaveBeenCalledTimes(stats)
    expect(mockUseSetTag).toHaveBeenCalledTimes(1)

    await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

    expect(mockUseInit).toHaveBeenCalledTimes(1)
    expect(mockUseCaptureMessage).toHaveBeenCalledTimes(stats)
    expect(mockUseSetTag).toHaveBeenCalledTimes(1)
    expect(mockUseError).toHaveBeenCalledTimes(0)
    expect(mockUseWarn).toHaveBeenCalledTimes(0)
    expect(mockUseLog).toHaveBeenCalledTimes(0)


}


describe("Logging provider" ,() => {

    afterEach(() => { localStorage.clear(); })

    test('Should be robust to rerendering', async () => {

        process.env.NODE_ENV = 'development'

        const Config = {
            "logging": {
                "sentry"   : { "dsn" : "https://5383c643fb7f49c8ae0b87c5a00a1f7b@o4505149124640768.ingest.sentry.io/4505149126148096" },
                "settings" : {
                    "components": ["all"],
                    "levels":     ["fatal", "error", "warning", "info", "debug", "log"],
                    "level":      "log",
                },
            },
        }

        const mockUseInit = jest.fn((conf) => {  });
        useInit.mockReturnValue(mockUseInit);
        const mockUseCaptureMessage = jest.fn((message, options) => {});
        useCaptureMessage.mockReturnValue(mockUseCaptureMessage);
        const mockUseSetTag = jest.fn((name, value) => { });
        useSetTag.mockReturnValue(mockUseSetTag);
        const mockUseLog = jest.fn((text) => { });
        useLog.mockReturnValue(mockUseLog);
        const mockUseError = jest.fn((text) => { });
        useError.mockReturnValue(mockUseError);
        const mockUseWarn = jest.fn((text) => { });
        useWarn.mockReturnValue(mockUseWarn);

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <StrictMode>
                    <div>
                        <MockConfigurationProvider config={Config}>
                            <LoggingProvider>
                                <MockLoggingConsumer mode={process.env.NODE_ENV} index={0}/>
                            </LoggingProvider>
                        </MockConfigurationProvider>
                    </div>
                </StrictMode>

            );

        })

        const button_name = `mock-logging-consumer-0`

        expect(mockUseError).toHaveBeenCalledTimes(4)
        expect(mockUseWarn).toHaveBeenCalledTimes(2)
        expect(mockUseLog).toHaveBeenCalledTimes(6)

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

        expect(mockUseError).toHaveBeenCalledTimes(4)
        expect(mockUseWarn).toHaveBeenCalledTimes(2)
        expect(mockUseLog).toHaveBeenCalledTimes(6)

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

        expect(mockUseError).toHaveBeenCalledTimes(8)
        expect(mockUseWarn).toHaveBeenCalledTimes(4)
        expect(mockUseLog).toHaveBeenCalledTimes(12)

        expect(mockUseInit).toHaveBeenCalledTimes(0)
        expect(mockUseCaptureMessage).toHaveBeenCalledTimes(0)
        expect(mockUseSetTag).toHaveBeenCalledTimes(0)

    })


    test('Should activate and deactivate logging publication in development', async () => {

        process.env.NODE_ENV = 'development'

        const levels = ['fatal', 'error', 'warning', 'info', 'debug', 'log'];
        const stats = [
            {error:1, warning:0, log:0},
            {error:2, warning:0, log:0},
            {error:2, warning:1, log:0},
            {error:2, warning:1, log:1},
            {error:2, warning:1, log:2},
            {error:2, warning:1, log:3}
        ]


        for (let i_level = 0; i_level < 1; i_level++) {

            await developmentTest(levels[i_level], ["all"], stats[i_level], i_level)
            localStorage.clear();

        }

    })


    test('Should activate and deactivate logging publication in production', async () => {


        process.env.NODE_ENV = 'production'

        const levels = ['fatal', 'error', 'warning', 'info', 'debug', 'log'];
        const stats = [1, 2, 3, 4, 4, 4]

        for (let i_level = 0; i_level < levels.length; i_level++) {

            await productionTest(levels[i_level], ["all"], stats[i_level], i_level)
            localStorage.clear();

        }


    })

    test('Should not send message for non required components in production', async () => {


        process.env.NODE_ENV = 'production'

        const levels = ['fatal', 'error', 'warning', 'info', 'debug', 'log'];
        const stats_selected = [1, 2, 3, 4, 4, 4]
        const stats_unselected = [1, 2, 3, 3, 3, 3]

        for (let i_level = 0; i_level < levels.length; i_level++) {

            await productionTest(levels[i_level], ["test"], stats_selected[i_level], i_level)
            localStorage.clear();

        }
        for (let i_level = 0; i_level < levels.length; i_level++) {

            await productionTest(levels[i_level], [], stats_unselected[i_level], i_level + levels.length)
            localStorage.clear();

        }


    })

    test('Should not send message for non required components in development', async () => {


        process.env.NODE_ENV = 'development'

        const levels = ['fatal', 'error', 'warning', 'info', 'debug', 'log'];
        const stats_selected = [
            {error:1, warning:0, log:0},
            {error:2, warning:0, log:0},
            {error:2, warning:1, log:0},
            {error:2, warning:1, log:1},
            {error:2, warning:1, log:2},
            {error:2, warning:1, log:3}
        ]
        const stats_unselected = [
            {error:0, warning:0, log:0},
            {error:0, warning:0, log:0},
            {error:0, warning:0, log:0},
            {error:0, warning:0, log:0},
            {error:0, warning:0, log:0},
            {error:0, warning:0, log:0}
        ]

        for (let i_level = 0; i_level < levels.length; i_level++) {

            await developmentTest(levels[i_level], ["test"], stats_selected[i_level], i_level)
            localStorage.clear();

        }
        for (let i_level = 0; i_level < levels.length; i_level++) {

            await developmentTest(levels[i_level], [], stats_unselected[i_level], i_level + levels.length)
            localStorage.clear();

        }


    })

})
