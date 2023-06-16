/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Seasons Provider test suite
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
import { useSeasons, SeasonsProvider }         from '../../providers/seasons';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useInitializeApp, useGetFirestore, useGetStorage, useGetApps }         from '../seasons/FirebaseHook';
import { useCollection, useGetDocs, useRef, useGetDownloadUrl }                 from '../seasons/FirebaseHook';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
jest.mock('../seasons/FirebaseHook');
jest.mock('../../providers', () => ({
    useLogging:       (() => { return mockUseLogging(); }),
    useConfiguration: (() => { return mockUseConfiguration(); }),
}));
/* eslint-enable jest/no-mocks-import */

function MockSeasonsConsumer(props) {

    const { seasons_size, renders_before_test } = props;
    const { seasons } = useSeasons();
    var renders = JSON.parse(localStorage.getItem('mock-seasons-consumer'));

    renders = renders + 1;
    localStorage.setItem('mock-seasons-consumer', JSON.stringify(renders))

    if (renders >= renders_before_test) { expect(Object.keys(seasons).length).toBe(seasons_size) }

    return(

        <Fragment>
            { Object.keys(seasons).map((item, index) => {

                const label = `mock-seasons-consumer-${index}`
                return(<Typography key={label} data-testid={label}>{seasons[item].name}</Typography>)

            })}
            <Typography key='mock-seasons-consumer-renders' data-testid='mock-seasons-consumer-renders'>{renders}</Typography>
        </Fragment>

    )

};

describe("Seasons provider" ,() => {

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

    class DataSeason {

        constructor(id, name, version) { this.name = name; this.id = id; this._document = {}; this._document.version = {}; this._document.version.timestamp = version }
        data() {

            const result = { 'name' : this.name };
            return result

        }

    }

    class Result {

        constructor(results) { this.results = results; this.size = results.length }
        forEach(resolve) {

            return this.results.forEach(resolve)

        }

    }

    const seasons_reference = [ new DataSeason('1', 'season1', {seconds:0, nanoseconds:0}), new DataSeason('2', 'season2', {seconds:0, nanoseconds:0}), new DataSeason('3', 'season3', {seconds:0, nanoseconds:0})]
    const seasons_removed   = [ new DataSeason('1', 'season1', {seconds:0, nanoseconds:0}), new DataSeason('2', 'season2', {seconds:0, nanoseconds:0})]
    const seasons_added     = [ new DataSeason('1', 'season1', {seconds:0, nanoseconds:0}), new DataSeason('2', 'season2', {seconds:0, nanoseconds:0}), new DataSeason('3', 'season3', {seconds:0, nanoseconds:0}), new DataSeason('4', 'season4', {seconds:0, nanoseconds:0})]
    const seasons_updated   = [ new DataSeason('1', 'season1', {seconds:1, nanoseconds:0}), new DataSeason('2', 'season2', {seconds:0, nanoseconds:0}), new DataSeason('3', 'season3', {seconds:0, nanoseconds:0})]
    var   seasons_current    = seasons_reference

    const delay = ms => new Promise(res => setTimeout(res, ms));

    afterEach(() => { localStorage.clear(); cleanup(); })

    test('Should collect and organize data', async () => {

        const mockGetFirestore = jest.fn(() => { return {} });
        useGetFirestore.mockReturnValue(mockGetFirestore);
        const mockGetStorage = jest.fn(() => { return {} });
        useGetStorage.mockReturnValue(mockGetStorage);
        const mockInitializeApp = jest.fn((app) => { return null });
        useInitializeApp.mockReturnValue(mockInitializeApp);
        const mockGetApps = jest.fn(() => { return [] });
        useGetApps.mockReturnValue(mockGetApps);
        const mockCollection = jest.fn((firestore, name) => { return name; });
        useCollection.mockReturnValue(mockCollection);
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(seasons_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        seasons_current = seasons_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <SeasonsProvider >
                                <MockSeasonsConsumer seasons_size={3} renders_before_test={4}/>
                            </SeasonsProvider>
                        </MockLoggingProvider>
                    </MockConfigurationProvider>
                </StrictMode>

            );

        })

        await delay(3000);

        expect(mockInitializeApp).toHaveBeenCalledTimes(2)
        expect(mockGetApps).toHaveBeenCalledTimes(2)
        expect(mockGetFirestore).toHaveBeenCalledTimes(2)
        expect(mockGetStorage).toHaveBeenCalledTimes(2)
        expect(mockCollection).toHaveBeenCalledTimes(2)
        expect(mockGetDocs).toHaveBeenCalledTimes(2)
        expect(mockRef).toHaveBeenCalledTimes(12)
        expect(mockGetDownloadUrl).toHaveBeenCalledTimes(12)

        expect(screen.getByTestId('mock-seasons-consumer-0').textContent).toBe('season1');
        expect(screen.getByTestId('mock-seasons-consumer-1').textContent).toBe('season2');
        expect(screen.getByTestId('mock-seasons-consumer-2').textContent).toBe('season3');

    })

    test('Should not update if data have not changed', async () => {

        const mockGetFirestore = jest.fn(() => { return {} });
        useGetFirestore.mockReturnValue(mockGetFirestore);
        const mockGetStorage = jest.fn(() => { return {} });
        useGetStorage.mockReturnValue(mockGetStorage);
        const mockInitializeApp = jest.fn((app) => { return null });
        useInitializeApp.mockReturnValue(mockInitializeApp);
        const mockGetApps = jest.fn(() => { return [] });
        useGetApps.mockReturnValue(mockGetApps);
        const mockCollection = jest.fn((firestore, name) => { return name; });
        useCollection.mockReturnValue(mockCollection);
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(seasons_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        seasons_current = seasons_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider>
                            <MockSeasonsConsumer seasons_size={3} renders_before_test={2}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        seasons_current = seasons_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider>
                            <MockSeasonsConsumer seasons_size={3} renders_before_test={3}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('3');
        cleanup();

    })

    test('Should update if data have been added', async () => {

        const mockGetFirestore = jest.fn(() => { return {} });
        useGetFirestore.mockReturnValue(mockGetFirestore);
        const mockGetStorage = jest.fn(() => { return {} });
        useGetStorage.mockReturnValue(mockGetStorage);
        const mockInitializeApp = jest.fn((app) => { return null });
        useInitializeApp.mockReturnValue(mockInitializeApp);
        const mockGetApps = jest.fn(() => { return [] });
        useGetApps.mockReturnValue(mockGetApps);
        const mockCollection = jest.fn((firestore, name) => { return name; });
        useCollection.mockReturnValue(mockCollection);
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(seasons_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        seasons_current = seasons_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider>
                            <MockSeasonsConsumer seasons_size={3} renders_before_test={2}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since a data have added
        seasons_current = seasons_added
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider>
                            <MockSeasonsConsumer seasons_size={4} renders_before_test={4}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        seasons_current = seasons_added
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider>
                            <MockSeasonsConsumer seasons_size={4} renders_before_test={5}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('5');
        cleanup();


    })

    test('Should update if data have been removed', async () => {

        const mockGetFirestore = jest.fn(() => { return {} });
        useGetFirestore.mockReturnValue(mockGetFirestore);
        const mockGetStorage = jest.fn(() => { return {} });
        useGetStorage.mockReturnValue(mockGetStorage);
        const mockInitializeApp = jest.fn((app) => { return null });
        useInitializeApp.mockReturnValue(mockInitializeApp);
        const mockGetApps = jest.fn(() => { return [] });
        useGetApps.mockReturnValue(mockGetApps);
        const mockCollection = jest.fn((firestore, name) => { return name; });
        useCollection.mockReturnValue(mockCollection);
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(seasons_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        seasons_current = seasons_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider>
                            <MockSeasonsConsumer seasons_size={3} renders_before_test={2}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since data have been removed
        seasons_current = seasons_removed
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider>
                            <MockSeasonsConsumer seasons_size={2} renders_before_test={4}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        seasons_current = seasons_removed
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider  >
                            <MockSeasonsConsumer seasons_size={2} renders_before_test={5}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('5');

    })

    test('Should update if data have been updated', async () => {

        const mockGetFirestore = jest.fn(() => { return {} });
        useGetFirestore.mockReturnValue(mockGetFirestore);
        const mockGetStorage = jest.fn(() => { return {} });
        useGetStorage.mockReturnValue(mockGetStorage);
        const mockInitializeApp = jest.fn((app) => { return null });
        useInitializeApp.mockReturnValue(mockInitializeApp);
        const mockGetApps = jest.fn(() => { return [] });
        useGetApps.mockReturnValue(mockGetApps);
        const mockCollection = jest.fn((firestore, name) => { return name; });
        useCollection.mockReturnValue(mockCollection);
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(seasons_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        seasons_current = seasons_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider>
                            <MockSeasonsConsumer seasons_size={3} renders_before_test={2}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since data have been updated
        seasons_current = seasons_updated
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider>
                            <MockSeasonsConsumer seasons_size={3} renders_before_test={4}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        seasons_current = seasons_updated
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <SeasonsProvider  >
                            <MockSeasonsConsumer seasons_size={3} renders_before_test={5}/>
                        </SeasonsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-seasons-consumer-renders').textContent).toBe('5');

    })

    test('Should manage no data', async () => {

        const mockGetFirestore = jest.fn(() => { return {} });
        useGetFirestore.mockReturnValue(mockGetFirestore);
        const mockGetStorage = jest.fn(() => { return {} });
        useGetStorage.mockReturnValue(mockGetStorage);
        const mockInitializeApp = jest.fn((app) => { return null });
        useInitializeApp.mockReturnValue(mockInitializeApp);
        const mockGetApps = jest.fn(() => { return [] });
        useGetApps.mockReturnValue(mockGetApps);
        const mockCollection = jest.fn((firestore, name) => { return name; });
        useCollection.mockReturnValue(mockCollection);
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(seasons_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        seasons_current = []
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <SeasonsProvider >
                                <MockSeasonsConsumer seasons_size={0} renders_before_test={4}/>
                            </SeasonsProvider>
                        </MockLoggingProvider>
                    </MockConfigurationProvider>
                </StrictMode>

            );

        })

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(3000);

        expect(mockInitializeApp).toHaveBeenCalledTimes(2)
        expect(mockGetApps).toHaveBeenCalledTimes(2)
        expect(mockGetFirestore).toHaveBeenCalledTimes(2)
        expect(mockGetStorage).toHaveBeenCalledTimes(2)
        expect(mockCollection).toHaveBeenCalledTimes(2)
        expect(mockGetDocs).toHaveBeenCalledTimes(2)
        expect(mockRef).toHaveBeenCalledTimes(0)
        expect(mockGetDownloadUrl).toHaveBeenCalledTimes(0)

    })

})



