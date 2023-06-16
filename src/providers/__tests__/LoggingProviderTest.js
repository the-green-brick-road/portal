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

    const { mode, index, jndex } = props;
    const { activateLogging, deactivateLogging, isLoggingActivated, logText, onRender } = useLogging();
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

    onRender('test','render',10,10)
    onRender('test','render',20,20)

    const handleClick = () => {

        if (isLoggingActivated) { deactivateLogging() }
        else                    { activateLogging()   }

        calls = calls + 1;
        localStorage.setItem('mock-logging-consumer', JSON.stringify(calls))

    }

    const button_name = `mock-logging-consumer-${index}-${jndex}`

    return(
        <Button aria-label={button_name} onClick={handleClick} />
    )

};

const developmentTest = async (level, components, topics, stats, index, jndex) => {

    const Config = {
        "logging": {
            "sentry"   : { "dsn" : "https://5383c643fb7f49c8ae0b87c5a00a1f7b@o4505149124640768.ingest.sentry.io/4505149126148096" },
            "settings" : {
                "components": components,
                "topics":     topics,
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
    const mockUseLog = jest.fn((text) => {  });
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
                        <MockLoggingConsumer mode={process.env.NODE_ENV} index={index} jndex={jndex}/>
                    </LoggingProvider>
                </MockConfigurationProvider>
            </div>

        );

    })

    const button_name = `mock-logging-consumer-${index}-${jndex}`

    expect(mockUseError).toHaveBeenCalledTimes(stats.error)
    expect(mockUseWarn).toHaveBeenCalledTimes(stats.warning)
    expect(mockUseLog).toHaveBeenCalledTimes(stats.log + stats.render)

    await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

    expect(mockUseError).toHaveBeenCalledTimes(stats.error)
    expect(mockUseWarn).toHaveBeenCalledTimes(stats.warning)
    expect(mockUseLog).toHaveBeenCalledTimes(stats.log + stats.render)

    await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

    expect(mockUseError).toHaveBeenCalledTimes(stats.error * 2)
    expect(mockUseWarn).toHaveBeenCalledTimes(stats.warning * 2)
    expect(mockUseLog).toHaveBeenCalledTimes(stats.log * 2 + stats.render + (stats.render !== 0?1:0))

    expect(mockUseInit).toHaveBeenCalledTimes(0)
    expect(mockUseCaptureMessage).toHaveBeenCalledTimes(0)
    expect(mockUseSetTag).toHaveBeenCalledTimes(0)

}

const productionTest = async (level, components, topics, stats, index, jndex) => {

    process.env.NODE_ENV = 'production'

    const Config = {
        "logging": {
            "sentry"   : { "dsn" : "https://5383c643fb7f49c8ae0b87c5a00a1f7b@o4505149124640768.ingest.sentry.io/4505149126148096" },
            "settings" : {
                "components": components,
                "topics":     topics,
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
                        <MockLoggingConsumer mode={process.env.NODE_ENV} index={index} jndex={jndex}/>
                    </LoggingProvider>
                </MockConfigurationProvider>
            </div>

        );

    })

    const button_name = `mock-logging-consumer-${index}-${jndex}`

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
                    "topics":     ["all"],
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
                                <MockLoggingConsumer mode={process.env.NODE_ENV} index={0} jndex={0}/>
                            </LoggingProvider>
                        </MockConfigurationProvider>
                    </div>
                </StrictMode>

            );

        })

        const button_name = `mock-logging-consumer-0-0`

        expect(mockUseError).toHaveBeenCalledTimes(4)
        expect(mockUseWarn).toHaveBeenCalledTimes(2)
        expect(mockUseLog).toHaveBeenCalledTimes(14)

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

        expect(mockUseError).toHaveBeenCalledTimes(4)
        expect(mockUseWarn).toHaveBeenCalledTimes(2)
        expect(mockUseLog).toHaveBeenCalledTimes(14)

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: button_name }))}) // eslint-disable-line testing-library/no-unnecessary-act

        expect(mockUseError).toHaveBeenCalledTimes(8)
        expect(mockUseWarn).toHaveBeenCalledTimes(4)
        expect(mockUseLog).toHaveBeenCalledTimes(25)

        expect(mockUseInit).toHaveBeenCalledTimes(0)
        expect(mockUseCaptureMessage).toHaveBeenCalledTimes(0)
        expect(mockUseSetTag).toHaveBeenCalledTimes(0)

    })


    test('Should activate and deactivate logging publication in development', async () => {

        process.env.NODE_ENV = 'development'

        const levels = ['fatal', 'error', 'warning', 'info', 'debug', 'log'];
        const topics = [ 'test', 'profiling','all']
        const stats = [
            {error:1, warning:0, log:0, render: 0},
            {error:2, warning:0, log:0, render: 0},
            {error:2, warning:1, log:0, render: 0},
            {error:2, warning:1, log:1, render: 0},
            {error:2, warning:1, log:2, render: 0},
            {error:2, warning:1, log:3, render: 0},
            {error:0, warning:0, log:0, render: 0},
            {error:0, warning:0, log:0, render: 0},
            {error:0, warning:0, log:0, render: 0},
            {error:0, warning:0, log:0, render: 0},
            {error:0, warning:0, log:2, render: 3},
            {error:0, warning:0, log:2, render: 3},
            {error:1, warning:0, log:0, render: 0},
            {error:2, warning:0, log:0, render: 0},
            {error:2, warning:1, log:0, render: 0},
            {error:2, warning:1, log:1, render: 0},
            {error:2, warning:1, log:4, render: 3},
            {error:2, warning:1, log:5, render: 3}
        ]

        for (let i_topic = 0; i_topic < topics.length; i_topic ++) {

            for (let i_level = 0; i_level < levels.length; i_level++) {

                await developmentTest(levels[i_level], ["all"], topics[i_topic], stats[ i_topic * levels.length + i_level ], i_level, i_topic)
                localStorage.clear();

            }

        }

    })

    test('Should activate and deactivate logging publication in production', async () => {

        process.env.NODE_ENV = 'production'

        const levels = ['fatal', 'error', 'warning', 'info', 'debug', 'log'];
        const topics = [ 'test', 'profiling', 'all']
        const stats = [1, 2, 3, 4, 4, 4, 1, 2, 3, 3, 3, 3, 1, 2, 3, 4, 4, 4]

        for (let i_topic = 0; i_topic < topics.length; i_topic ++) {

            for (let i_level = 0; i_level < levels.length; i_level++) {

                await productionTest(levels[i_level], ["all"], topics[i_topic], stats[i_topic * levels.length + i_level], i_level, i_topic)
                localStorage.clear();

            }

        }


    })

    test('Should not send message for non required components in production', async () => {

        process.env.NODE_ENV = 'production'

        const levels = ['fatal', 'error', 'warning', 'info', 'debug', 'log'];
        const topics = [ 'test', 'profiling', 'all']
        const stats_selected = [1, 2, 3, 4, 4, 4, 1, 2, 3, 3, 3, 3, 1, 2, 3, 4, 4, 4]
        const stats_unselected = [1, 2, 3, 3, 3, 3, 1, 2, 3, 3, 3, 3, 1, 2, 3, 3, 3, 3]

        for (let i_topic = 0; i_topic < topics.length; i_topic ++) {

            for (let i_level = 0; i_level < levels.length; i_level++) {

                await productionTest(levels[i_level], ["test"], topics[i_topic], stats_selected[i_topic * levels.length + i_level], i_level, i_topic)
                localStorage.clear();

            }

        }
        for (let i_topic = 0; i_topic < topics.length; i_topic ++) {

            for (let i_level = 0; i_level < levels.length; i_level++) {

                await productionTest(levels[i_level], [], topics[i_topic], stats_unselected[i_topic * levels.length + i_level], i_level + levels.length, i_topic + topics.length)
                localStorage.clear();

            }

        }

    })

    test('Should not send message for non required components in development', async () => {


        process.env.NODE_ENV = 'development'

        const levels = [ 'fatal', 'error', 'warning', 'info', 'debug', 'log'];
        const topics = [ 'test', 'profiling', 'all']
        const stats_selected = [
            {error:1, warning:0, log:0, render:0},
            {error:2, warning:0, log:0, render:0},
            {error:2, warning:1, log:0, render:0},
            {error:2, warning:1, log:1, render:0},
            {error:2, warning:1, log:2, render:0},
            {error:2, warning:1, log:3, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:2, render:0},
            {error:0, warning:0, log:2, render:0},
            {error:1, warning:0, log:0, render:0},
            {error:2, warning:0, log:0, render:0},
            {error:2, warning:1, log:0, render:0},
            {error:2, warning:1, log:1, render:0},
            {error:2, warning:1, log:4, render:0},
            {error:2, warning:1, log:5, render:0}
        ]
        const stats_unselected = [
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0},
            {error:0, warning:0, log:0, render:0}
        ]

        for (let i_topic = 0; i_topic < topics.length; i_topic ++) {

            for (let i_level = 0; i_level < levels.length; i_level++) {

                await developmentTest(levels[i_level], ["test"], topics[i_topic], stats_selected[i_topic * levels.length + i_level], i_level, i_topic)
                localStorage.clear();

            }

        }
        for (let i_topic = 0; i_topic < topics.length; i_topic ++) {

            for (let i_level = 0; i_level < levels.length; i_level++) {

                await developmentTest(levels[i_level], [], topics[i_topic], stats_unselected[i_topic * levels.length + i_level], i_level + levels.length, i_topic + topics.length)
                localStorage.clear();

            }

        }

    })

})
