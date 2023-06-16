/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Team Provider test suite
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
import { useTeam, TeamProvider }         from '../../providers/team';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useInitializeApp, useGetFirestore, useGetStorage, useGetApps }         from '../team/FirebaseHook';
import { useCollection, useGetDocs, useRef, useGetDownloadUrl }                 from '../team/FirebaseHook';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
jest.mock('../team/FirebaseHook');
jest.mock('../../providers', () => ({
    useLogging:       (() => { return mockUseLogging(); }),
    useConfiguration: (() => { return mockUseConfiguration(); }),
}));
/* eslint-enable jest/no-mocks-import */

function MockTeamConsumer(props) {

    const { team_size, renders_before_test } = props;
    const { team } = useTeam();
    var renders = JSON.parse(localStorage.getItem('mock-team-consumer'));

    renders = renders + 1;
    localStorage.setItem('mock-team-consumer', JSON.stringify(renders))

    if (renders >= renders_before_test) { expect(Object.keys(team).length).toBe(team_size) }

    return(

        <Fragment>
            { Object.keys(team).map((item, index) => {

                const label = `mock-team-consumer-${index}`
                return(<Typography key={label} data-testid={label}>{team[item].name}</Typography>)

            })}
            <Typography key='mock-team-consumer-renders' data-testid='mock-team-consumer-renders'>{renders}</Typography>
        </Fragment>

    )

};

describe("Team provider" ,() => {

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

    class DataTeam  {

        constructor(id, name, version, image = undefined) {

            this.name = name; this.id = id; this._document = {}; this._document.version = {}; this._document.version.timestamp = version;
            if (image !== undefined) { this.image = image}

        }
        data() {

            let result = {}
            if(this.hasOwnProperty('image')) { result = { 'name' : this.name, 'image-root': this.name } }
            else { result = { 'name' : this.name } }
            return result

        }

    }

    class Result {

        constructor(results) { this.results = results; this.size = results.length }
        forEach(resolve) {

            return this.results.forEach(resolve)

        }

    }

    const team_reference = [ new DataTeam('1', 'member1', {seconds:0, nanoseconds:0},'member1'), new DataTeam('2', 'member2', {seconds:0, nanoseconds:0},'member2'), new DataTeam('3', 'member3', {seconds:0, nanoseconds:0})]
    const team_removed   = [ new DataTeam('1', 'member1', {seconds:0, nanoseconds:0},'member1'), new DataTeam('2', 'member2', {seconds:0, nanoseconds:0},'member2')]
    const team_added     = [ new DataTeam('1', 'member1', {seconds:0, nanoseconds:0},'member1'), new DataTeam('2', 'member2', {seconds:0, nanoseconds:0},'member2'), new DataTeam('3', 'member3', {seconds:0, nanoseconds:0}), new DataTeam('4', 'member4','member4', {seconds:0, nanoseconds:0})]
    const team_updated   = [ new DataTeam('1', 'member1', {seconds:1, nanoseconds:0},'member1'), new DataTeam('2', 'member2', {seconds:0, nanoseconds:0},'member2'), new DataTeam('3', 'member3', {seconds:0, nanoseconds:0})]
    var   team_current    = team_reference

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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(team_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        team_current = team_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <TeamProvider>
                                <MockTeamConsumer team_size={3} renders_before_test={4}/>
                            </TeamProvider>
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
        expect(mockRef).toHaveBeenCalledTimes(8)
        expect(mockGetDownloadUrl).toHaveBeenCalledTimes(8)

        expect(screen.getByTestId('mock-team-consumer-0').textContent).toBe('member1');
        expect(screen.getByTestId('mock-team-consumer-1').textContent).toBe('member2');
        expect(screen.getByTestId('mock-team-consumer-2').textContent).toBe('member3');

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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(team_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        team_current = team_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider>
                            <MockTeamConsumer team_size={3} renders_before_test={2}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        team_current = team_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider>
                            <MockTeamConsumer team_size={3} renders_before_test={3}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('3');
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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(team_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        team_current = team_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider>
                            <MockTeamConsumer team_size={3} renders_before_test={2}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since a data have added
        team_current = team_added
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider>
                            <MockTeamConsumer team_size={4} renders_before_test={4}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        team_current = team_added
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider>
                            <MockTeamConsumer team_size={4} renders_before_test={5}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('5');
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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(team_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        team_current = team_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider>
                            <MockTeamConsumer team_size={3} renders_before_test={2}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since data have been removed
        team_current = team_removed
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider>
                            <MockTeamConsumer team_size={2} renders_before_test={4}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        team_current = team_removed
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider  >
                            <MockTeamConsumer team_size={2} renders_before_test={5}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('5');

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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(team_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        team_current = team_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider>
                            <MockTeamConsumer team_size={3} renders_before_test={2}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since data have been updated
        team_current = team_updated
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider>
                            <MockTeamConsumer team_size={3} renders_before_test={4}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        team_current = team_updated
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <TeamProvider  >
                            <MockTeamConsumer team_size={3} renders_before_test={5}/>
                        </TeamProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-team-consumer-renders').textContent).toBe('5');

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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(team_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        team_current = []
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <TeamProvider >
                                <MockTeamConsumer team_size={0} renders_before_test={4}/>
                            </TeamProvider>
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

