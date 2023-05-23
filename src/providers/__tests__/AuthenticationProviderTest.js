/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Authentication Provider test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @15 may 2023
# Latest revision: 15 may 2023
# ---------------------------------------------------- */

/* React includes */
import { StrictMode }                                   from 'react';

/* Material UI includes */
import { Button, Container }                            from '@mui/material';

/* Test includes */
import { render, fireEvent, screen, act}                from '@testing-library/react'
import { expect, test}                                  from '@jest/globals';

/* Component under test */
import { useAuthentication, AuthenticationProvider }    from '../../providers/authentication';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useGetFirestore, useCollection, useQuery, useGetDocs, useWhere }                       from '../authentication/FirebaseHook';
import { useInitializeApp, useGetApps }                                                         from '../authentication/FirebaseHook';
import { useGetAuth, useEmailAuthProvider, useGoogleAuthProvider, useGetUIAuth, useDeleteUser } from '../authentication/FirebaseHook';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider }                 from '../../providers/__mocks__/LoggingProvider';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider } from '../../providers/__mocks__/ConfigurationProvider';
jest.mock('../authentication/FirebaseHook');
jest.mock('../../providers', () => ({
    useLogging: (() => { return mockUseLogging(); }),
    useConfiguration: (() => { return mockUseConfiguration(); }),
}));
/* eslint-enable jest/no-mocks-import */

function MockAuthenticationConsumer() {

    const { isAuthenticated, setIsAuthenticated, isOpen, setIsOpen } = useAuthentication();

    var calls = JSON.parse(localStorage.getItem('mock-authentication-consumer'));
    if (calls === null) { calls = 0; }

    if (calls % 2 === 0) { expect(isAuthenticated).toBe(false) }
    else                 { expect(isAuthenticated).toBe(true)  }

    if (calls % 2 === 0) { expect(isOpen).toBe(false) }
    else                 { expect(isOpen).toBe(true)  }

    const handleClick = () => {

        if (isAuthenticated)   { setIsAuthenticated(false) }
        else                   { setIsAuthenticated(true)  }

        if (isOpen)            { setIsOpen(false) }
        else                   { setIsOpen(true)  }

        calls = calls + 1;
        localStorage.setItem('mock-authentication-consumer', JSON.stringify(calls))

    }

    return(
        <Container>
            <Button aria-label='mock-authentication-consumer' onClick={handleClick} />
        </Container>
    )

};

describe("Authentication provider" ,() => {

    test('Should set authentication', async () => {

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

        const mockInitializeApp = jest.fn((app) => { return null });
        useInitializeApp.mockReturnValue(mockInitializeApp);
        const mockGetApps = jest.fn(() => { return [] });
        useGetApps.mockReturnValue(mockGetApps);
        const mockGetFirestore = jest.fn(() => { return null });
        useGetFirestore.mockReturnValue(mockGetFirestore);
        const mockGetAuth = jest.fn(() => { return null });
        useGetAuth.mockReturnValue(mockGetAuth);
        class mockUIAuth {

            constructor(auth) { } /* eslint-disable-line no-useless-constructor */
            static getInstance() { return null }

        }
        const temp = {AuthUI : mockUIAuth}
        useGetUIAuth.mockReturnValue(temp);
        const mockEmailAuthProvider = jest.fn(() => { return {PROVIDER_ID:12} });
        useEmailAuthProvider.mockReturnValue(mockEmailAuthProvider);
        const mockGoogleAuthProvider = jest.fn(() => { return {PROVIDER_ID:34} });
        useGoogleAuthProvider.mockReturnValue(mockGoogleAuthProvider);
        const mockCollection = jest.fn((store, name) => { return null });
        useCollection.mockReturnValue(mockCollection);
        const mockQuery = jest.fn(() => { return null });
        useQuery.mockReturnValue(mockQuery);
        const mockDeleteUser = jest.fn(() => {  });
        useDeleteUser.mockReturnValue(mockDeleteUser);
        const mockGetDocs = jest.fn(() => { return [] });
        useGetDocs.mockReturnValue(mockGetDocs);
        const mockWhere = jest.fn(() => { return [] });
        useWhere.mockReturnValue(mockWhere);



        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <AuthenticationProvider>
                                <MockAuthenticationConsumer/>
                            </AuthenticationProvider>
                        </MockLoggingProvider>
                    </MockConfigurationProvider>
                </StrictMode>

            );

        })

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-authentication-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-authentication-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act

    })


})
