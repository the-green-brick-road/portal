/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Data Provider test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* React includes */
import { StrictMode, Fragment }            from 'react';

/* Material UI includes */
import { Typography }                      from '@mui/material';

/* Test includes */
import { render, screen, act}              from '@testing-library/react'
import { expect, test}                     from '@jest/globals';

/* Component under test */
import { useData, DataProvider }           from '../../providers/data';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useInitializeApp, useGetFirestore, useGetStorage, useGetApps }         from '../data/FirebaseHook';
import { useCollection, useGetDocs, useRef, useGetDownloadUrl }                 from '../data/FirebaseHook';
import { useFetch }                                                             from '../data/RestHook';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
jest.mock('../data/FirebaseHook');
jest.mock('../data/RestHook');
jest.mock('../../providers', () => ({
    useLogging:       (() => { return mockUseLogging(); }),
    useConfiguration: (() => { return mockUseConfiguration(); }),
}));
/* eslint-enable jest/no-mocks-import */

function MockDataConsumer(props) {

    const { seasons_size, posts_size, robots_size, team_size, calendars_size } = props;
    const { seasons, posts, robots, team, calendars } = useData();
    var calls = JSON.parse(localStorage.getItem('mock-data-consumer'));

    calls = calls + 1;
    localStorage.setItem('mock-data-consumer', JSON.stringify(calls))

    if (calls > 5) {

        expect(seasons.length).toBe(seasons_size)
        expect(posts.length).toBe(posts_size)
        expect(robots.length).toBe(robots_size)
        expect(team.length).toBe(team_size)
        expect(Object.entries(calendars['public']).length).toBe(calendars_size)

    }

    return(

        <Fragment>
            { seasons.map((item, index) => {

                const label = `mock-data-consumer-season-${index}`
                return(<Typography key={label} data-testid={label}>{item.name}</Typography>)

            })}
            { posts.map((item, index) => {

                const label = `mock-data-consumer-post-${index}`
                return(<Typography key={label} data-testid={label}>{item.title}</Typography>)

            })}
            { robots.map((item, index) => {

                const label = `mock-data-consumer-robot-${index}`
                return(<Typography key={label} data-testid={label}>{item.name}</Typography>)

            })}
            { team.map((item, index) => {

                const label = `mock-data-consumer-team-${index}`
                return(<Typography key={label} data-testid={label}>{item.name}</Typography>)

            })}
            {('public' in calendars) && (Object.entries(calendars['public']).map((item, index) => {

                const label = `mock-data-consumer-calendar-${index}`
                return(<Typography key={label} data-testid={label}>{item[0]}</Typography>)

            }))}
        </Fragment>

    )

};

describe("Data provider" ,() => {

    test('Should collect and organize data', async () => {

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
        const mockGetDocs = jest.fn((name) => {

            class DataSeason {

                constructor(name) { this.name = name; }
                data() {

                    const result = { 'name' : this.name };
                    return result

                }

            }
            class DataTeam  {

                constructor(name, image) {

                    this.name = name;
                    if (image !== undefined) { this.image = image}

                }
                data() {

                    let result = {}
                    if(this.hasOwnProperty('image')) { result = { 'name' : this.name, 'image': this.name } }
                    else { result = { 'name' : this.name } }
                    return result

                }

            }
            class DataRobot {

                constructor(name, features=[], views=[]) { this.name = name; this.features = features; this.views = views}
                data() {

                    const result = { 'name' : this.name, 'image': this.name, 'features': this.features , 'views': this.views };
                    return result

                }

            }

            class DataPost {

                constructor(title, media) { this.title = title; this.media = media }
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

            return new Promise((resolve) => {

                let result = []
                if ( name === 'seasons' ) { result = [ new DataSeason('season1'), new DataSeason('season2'), new DataSeason('season3')]}
                if ( name === 'posts' ) { result = [ new DataPost('post1', []), new DataPost('post2', ['media1', 'media2', 'media3'])]}
                if ( name === 'robots' ) { result = [ new DataRobot('robot1',[{media:'media1'}],[{image:'view1'}]), new DataRobot('robot2'), new DataRobot('robot3')]}
                if ( name === 'team' ) { result = [ new DataTeam('member1','member1'), new DataTeam('member2','member2'), new DataTeam('member3'), new DataTeam('member4')]}

                resolve(new Result(result));

            });

        });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockFetch = jest.fn((name) => {


            class Response {

                constructor(data) { this.data = {items:data} }
                json() { return this.data }

            }

            return new Promise((resolve) => {

                resolve(new Response({'date1':{},'date2':{}}));

            });

        })
        useFetch.mockReturnValue(mockFetch);
        const mockRef = jest.fn((storage, path) => { return path  });
        useRef.mockReturnValue(mockRef);
        const mockGetDownloadUrl = jest.fn((path) => {

            return new Promise((resolve) => {

                resolve(path);

            });

        });
        useGetDownloadUrl.mockReturnValue(mockGetDownloadUrl);

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <DataProvider >
                                <MockDataConsumer seasons_size={3} robots_size={3} posts_size={2} team_size={4} calendars_size={2}/>
                            </DataProvider>
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
        expect(mockCollection).toHaveBeenCalledTimes(8)
        expect(mockGetDocs).toHaveBeenCalledTimes(8)
        expect(mockFetch).toHaveBeenCalledTimes(2)
        expect(mockRef).toHaveBeenCalledTimes(30)
        expect(mockGetDownloadUrl).toHaveBeenCalledTimes(30)

        expect(screen.getByTestId('mock-data-consumer-season-0').textContent).toBe('season1');
        expect(screen.getByTestId('mock-data-consumer-season-1').textContent).toBe('season2');
        expect(screen.getByTestId('mock-data-consumer-season-2').textContent).toBe('season3');
        expect(screen.getByTestId('mock-data-consumer-post-0').textContent).toBe('post1');
        expect(screen.getByTestId('mock-data-consumer-post-1').textContent).toBe('post2');
        expect(screen.getByTestId('mock-data-consumer-robot-0').textContent).toBe('robot2');
        expect(screen.getByTestId('mock-data-consumer-robot-1').textContent).toBe('robot3');
        expect(screen.getByTestId('mock-data-consumer-robot-2').textContent).toBe('robot1');
        expect(screen.getByTestId('mock-data-consumer-team-0').textContent).toBe('member3');
        expect(screen.getByTestId('mock-data-consumer-team-1').textContent).toBe('member4');
        expect(screen.getByTestId('mock-data-consumer-team-2').textContent).toBe('member1');
        expect(screen.getByTestId('mock-data-consumer-team-3').textContent).toBe('member2');
        expect(screen.getByTestId('mock-data-consumer-calendar-0').textContent).toBe('date1');
        expect(screen.getByTestId('mock-data-consumer-calendar-1').textContent).toBe('date2');

    })

})

