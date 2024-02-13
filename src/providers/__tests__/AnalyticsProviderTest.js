/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Analytics Provider test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @03 may 2023
# Latest revision: 09 may 2023
# ---------------------------------------------------- */

/* React includes */
import { StrictMode }                      from 'react';

/* Material UI includes */
import { Button }                          from '@mui/material';

/* Test includes */
import { render, fireEvent, screen, act}   from '@testing-library/react'
import { expect, test}                     from '@jest/globals';

/* Component under test */
import { useAnalytics, AnalyticsProvider } from '../../providers/analytics';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useIsSupported, useGetAnalytics, useSetAnalyticsCollectionEnabled }    from '../analytics/FirebaseHook';
import { useInitializeApp, useGetPerformance, useGetApps }                      from '../analytics/FirebaseHook';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
jest.mock('../analytics/FirebaseHook');
jest.mock('../../providers', () => ({
    useLogging:       (() => { return mockUseLogging(); }),
    useConfiguration: (() => { return mockUseConfiguration(); }),
}));
/* eslint-enable jest/no-mocks-import */

function MockAnalyticsConsumer() {

    const { activateAnalytics, deactivateAnalytics, isAnalyticsActivated } = useAnalytics();
    var calls = JSON.parse(localStorage.getItem('mock-analytics-consumer'));
    if (calls === null) { calls = 0; }

    if (calls % 2 === 0) { expect(isAnalyticsActivated).toBe(false) }
    else                 { expect(isAnalyticsActivated).toBe(true) }

    const handleClick = () => {

        if (isAnalyticsActivated) { deactivateAnalytics() }
        else                      { activateAnalytics()   }

        calls = calls + 1;
        localStorage.setItem('mock-analytics-consumer', JSON.stringify(calls))

    }

    return(
        <Button aria-label='mock-analytics-consumer' onClick={handleClick} />
    )

};

function MockPerformanceConsumer() {

    const { activatePerformance, deactivatePerformance, isPerformanceActivated } = useAnalytics();
    var calls = JSON.parse(localStorage.getItem('mock-performance-consumer'));
    if (calls === null) { calls = 0; }

    if (calls % 2 === 0) { expect(isPerformanceActivated).toBe(false) }
    else                 { expect(isPerformanceActivated).toBe(true) }

    const handleClick = () => {

        if (isPerformanceActivated) { deactivatePerformance() }
        else                        { activatePerformance()   }

        calls = calls + 1;
        localStorage.setItem('mock-performance-consumer', JSON.stringify(calls))

    }

    return(
        <Button aria-label='mock-performance-consumer' onClick={handleClick} />
    )

};

describe("Analytics provider" ,() => {

    test('Should activate and deactivate analytics publication', async () => {

        const Config = {
            "firebase"   : {
                "api-key"               : "AIzaSyDxkYnmt7ihsK7dA3hTY1Njk72XkV1qHrg",
                "auth-domain"           : "portal-8382d.firebaseapp.com",
                "project-id"            : "portal-8382d",
                "storage-bucket"        : "portal-8382d.appspot.com",
                "messaging-sender-id"   : "186359319446",
                "app-id"                : "1:186359319446:web:da2da46323495a19e3ebb7",
                "measurement-id"        : "G-EVC01WVTWW",
            },
        }

        const mockIsSupported = jest.fn(() => { return new Promise(function(callback) { callback(true); })});
        useIsSupported.mockReturnValue(mockIsSupported);
        const mockGetAnalytics = jest.fn(() => { return {} });
        useGetAnalytics.mockReturnValue(mockGetAnalytics);
        var performanceState = {instrumentationEnabled: true, dataCollectionEnabled: true}
        const mockGetPerformance = jest.fn(() => { return performanceState });
        useGetPerformance.mockReturnValue(mockGetPerformance);
        const mockSetAnalyticsCollectionEnabled = jest.fn((analytics, enable) => { });
        useSetAnalyticsCollectionEnabled.mockReturnValue(mockSetAnalyticsCollectionEnabled);
        const mockInitializeApp = jest.fn((app) => { return null });
        useInitializeApp.mockReturnValue(mockInitializeApp);
        const mockGetApps = jest.fn(() => { return [] });
        useGetApps.mockReturnValue(mockGetApps);


        Object.defineProperty(window, "doNotTrack", { value: null, writable: true});
        Object.defineProperty(navigator, "doNotTrack", { value: undefined, writable: true});

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <AnalyticsProvider >
                                <MockAnalyticsConsumer/>
                                <MockPerformanceConsumer/>
                            </AnalyticsProvider>
                        </MockLoggingProvider>
                    </MockConfigurationProvider>
                </StrictMode>

            );

        })

        expect(mockIsSupported).toHaveBeenCalledTimes(2)
        expect(mockInitializeApp).toHaveBeenCalledTimes(2)
        expect(mockGetAnalytics).toHaveBeenCalledTimes(2)
        expect(mockGetPerformance).toHaveBeenCalledTimes(2)
        expect(mockSetAnalyticsCollectionEnabled).toHaveBeenCalledTimes(2)
        expect(mockSetAnalyticsCollectionEnabled).toHaveBeenLastCalledWith({}, false)

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-analytics-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(mockSetAnalyticsCollectionEnabled).toHaveBeenLastCalledWith({}, true)
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-analytics-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(mockSetAnalyticsCollectionEnabled).toHaveBeenLastCalledWith({}, false)
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-performance-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-performance-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act

    })

    test('Should deactivate analytics publication in case Do Not Track is activated', async () => {

        const Config = {
            "firebase"   : {
                "api-key"               : "AIzaSyDxkYnmt7ihsK7dA3hTY1Njk72XkV1qHrg",
                "auth-domain"           : "portal-8382d.firebaseapp.com",
                "project-id"            : "portal-8382d",
                "storage-bucket"        : "portal-8382d.appspot.com",
                "messaging-sender-id"   : "186359319446",
                "app-id"                : "1:186359319446:web:da2da46323495a19e3ebb7",
                "measurement-id"        : "G-EVC01WVTWW",
            },
        }

        const mockIsSupported = jest.fn(() => { return new Promise(function(callback) { callback(true); })});
        useIsSupported.mockReturnValue(mockIsSupported);
        const mockGetAnalytics = jest.fn(() => { return {} });
        useGetAnalytics.mockReturnValue(mockGetAnalytics);
        var performanceState = {instrumentationEnabled: true, dataCollectionEnabled: true}
        const mockGetPerformance = jest.fn(() => { return performanceState });
        useGetPerformance.mockReturnValue(mockGetPerformance);
        const mockSetAnalyticsCollectionEnabled = jest.fn((analytics, enable) => { });
        useSetAnalyticsCollectionEnabled.mockReturnValue(mockSetAnalyticsCollectionEnabled);
        const mockInitializeApp = jest.fn((app) => { return null });
        useInitializeApp.mockReturnValue(mockInitializeApp);
        const mockGetApps = jest.fn(() => { return [] });
        useGetApps.mockReturnValue(mockGetApps);

        Object.defineProperty(window, "doNotTrack", { value: 1, writable: true});
        Object.defineProperty(navigator, "doNotTrack", { value: undefined, writable: true});

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <AnalyticsProvider >
                                <MockAnalyticsConsumer/>
                                <MockPerformanceConsumer/>
                            </AnalyticsProvider>
                        </MockLoggingProvider>
                    </MockConfigurationProvider>
                </StrictMode>

            );

        })

        expect(mockIsSupported).toHaveBeenCalledTimes(2)
        expect(mockInitializeApp).toHaveBeenCalledTimes(2)
        expect(mockGetAnalytics).toHaveBeenCalledTimes(2)
        expect(mockGetPerformance).toHaveBeenCalledTimes(2)
        expect(mockSetAnalyticsCollectionEnabled).toHaveBeenCalledTimes(2)
        expect(mockSetAnalyticsCollectionEnabled).toHaveBeenLastCalledWith({}, false)

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-analytics-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(mockSetAnalyticsCollectionEnabled).toHaveBeenLastCalledWith({}, false)
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-analytics-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(mockSetAnalyticsCollectionEnabled).toHaveBeenLastCalledWith({}, false)
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-performance-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-performance-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act

    })

})
