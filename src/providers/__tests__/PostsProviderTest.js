/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Posts Provider test suite
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
import { usePosts, PostsProvider }         from '../../providers/posts';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useInitializeApp, useGetFirestore, useGetStorage, useGetApps }         from '../posts/FirebaseHook';
import { useCollection, useGetDocs, useRef, useGetDownloadUrl }                 from '../posts/FirebaseHook';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
jest.mock('../posts/FirebaseHook');
jest.mock('../../providers', () => ({
    useLogging:       (() => { return mockUseLogging(); }),
    useConfiguration: (() => { return mockUseConfiguration(); }),
}));
/* eslint-enable jest/no-mocks-import */

function MockPostsConsumer(props) {

    const { posts_size, renders_before_test } = props;
    const { posts } = usePosts();
    var renders = JSON.parse(localStorage.getItem('mock-posts-consumer'));

    renders = renders + 1;
    localStorage.setItem('mock-posts-consumer', JSON.stringify(renders))

    if (renders >= renders_before_test) { expect(Object.keys(posts).length).toBe(posts_size) }

    return(

        <Fragment>
            { Object.keys(posts).map((item, index) => {

                const label = `mock-posts-consumer-${index}`
                return(<Typography key={label} data-testid={label}>{posts[item].title}</Typography>)

            })}
            <Typography key='mock-posts-consumer-renders' data-testid='mock-posts-consumer-renders'>{renders}</Typography>
        </Fragment>

    )

};

describe("Posts provider" ,() => {

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

    class DataPost {

        constructor(id, title, media, version) { this.title = title; this.media = media; this.id = id; this._document = {}; this._document.version = {}; this._document.version.timestamp = version }
        data() {

            const result = { 'title' : this.title, 'image': this.title, 'media' : this.media };
            return result

        }

    }

    class Result {

        constructor(results) { this.results = results; this.size = results.length }
        forEach(resolve) {

            return this.results.forEach(resolve)

        }

    }

    const posts_reference = [ new DataPost('1', 'post1', [], {seconds:0, nanoseconds:0}), new DataPost('2', 'post2', ['media1', 'media2', 'media3'], {seconds:0, nanoseconds:0})]
    const posts_removed   = [ new DataPost('1', 'post1', [], {seconds:0, nanoseconds:0})]
    const posts_added     = [ new DataPost('1', 'post1', [], {seconds:0, nanoseconds:0}), new DataPost('2', 'post2', ['media1', 'media2', 'media3'], {seconds:0, nanoseconds:0}), new DataPost('3', 'post3', [], {seconds:0, nanoseconds:0})]
    const posts_updated   = [ new DataPost('1', 'post11', [], {seconds:1, nanoseconds:0}), new DataPost('2', 'post2', ['media1', 'media2', 'media3'], {seconds:0, nanoseconds:0})]
    var   posts_current    = posts_reference

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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(posts_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        posts_current = posts_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <PostsProvider >
                                <MockPostsConsumer posts_size={2} renders_before_test={4}/>
                            </PostsProvider>
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
        expect(mockRef).toHaveBeenCalledTimes(10)
        expect(mockGetDownloadUrl).toHaveBeenCalledTimes(10)

        expect(screen.getByTestId('mock-posts-consumer-0').textContent).toBe('post1');
        expect(screen.getByTestId('mock-posts-consumer-1').textContent).toBe('post2');

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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(posts_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        posts_current = posts_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider>
                            <MockPostsConsumer posts_size={2} renders_before_test={2}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        posts_current = posts_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider>
                            <MockPostsConsumer posts_size={2} renders_before_test={3}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('3');
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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(posts_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        posts_current = posts_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider>
                            <MockPostsConsumer posts_size={2} renders_before_test={2}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since a data have added
        posts_current = posts_added
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider>
                            <MockPostsConsumer posts_size={3} renders_before_test={4}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        posts_current = posts_added
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider>
                            <MockPostsConsumer posts_size={3} renders_before_test={5}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('5');
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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(posts_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        posts_current = posts_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider>
                            <MockPostsConsumer posts_size={2} renders_before_test={2}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since data have been removed
        posts_current = posts_removed
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider>
                            <MockPostsConsumer posts_size={1} renders_before_test={4}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        posts_current = posts_removed
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider  >
                            <MockPostsConsumer posts_size={1} renders_before_test={5}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('5');

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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(posts_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        // Component should render once on first load, and once after the useEffect that updated state from database
        posts_current = posts_reference
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider>
                            <MockPostsConsumer posts_size={2} renders_before_test={2}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>

            );

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('2');
        cleanup();

        // Component should render once on first load, and once after the useEffect since data have been updated
        posts_current = posts_updated
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider>
                            <MockPostsConsumer posts_size={2} renders_before_test={4}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('4');
        cleanup();

        // Component should render once on first load, and not after the useEffect since the data did not change
        posts_current = posts_updated
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(
                <MockConfigurationProvider config={Config}>
                    <MockLoggingProvider>
                        <PostsProvider  >
                            <MockPostsConsumer posts_size={2} renders_before_test={5}/>
                        </PostsProvider>
                    </MockLoggingProvider>
                </MockConfigurationProvider>
            )

        })
        await delay(1000);
        expect(screen.getByTestId('mock-posts-consumer-renders').textContent).toBe('5');

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
        const mockGetDocs = jest.fn((name) => { return new Promise((resolve) => { resolve(new Result(posts_current)) }); });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => { return new Promise((resolve) => { resolve(path); }); });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        posts_current = []
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <PostsProvider >
                                <MockPostsConsumer posts_size={0} renders_before_test={4}/>
                            </PostsProvider>
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

