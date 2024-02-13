/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Footer component test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @29 may 2023
# Latest revision: 29 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM, act, screen, fireEvent } from '@testing-library/react'
import { expect, test}                               from '@jest/globals';

/* Component under test */
import { default as Login }  from '../../components/login/Login';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../../providers/__mocks__/DesignProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useAuth as mockUseAuth, AuthProvider as MockAuthProvider } from '../../providers/__mocks__/AuthProvider';
jest.mock('../../providers', () => ({
    useLogging: (() => { return mockUseLogging(); }),
    useDesign: (() => { return mockUseDesign(); }),
    useAuth: (() => { return mockUseAuth(); }),
}));
/* eslint-enable jest/no-mocks-import */

describe("Login component" ,() => {

    const theme = {
        "palette": {
            "common": {
                "black": "#444444",
                "white": "#555555",
            },
            "primary": {
                "main": "#666666",
                "light": "#666667",
                "dark": "#666668",
            },
            "secondary" : {
                "main": "#777777",
                "light": "#777778",
                "dark": "#777779",
            },
            "disabled" : {
                "main": "#888888",
                "light": "#888889",
                "dark": "#888880",
            },
            "text" : {
                "primary": "#111111",
                "secondary": "#222222",
                "disabled": "#333333",
            },
        },
        "direction": "ltr",
        "typography": {
            "h1": {
                "fontSize": "2.5rem",
                "color": "#111111",
                "textTransform": "uppercase",
                "fontFamily": "Roboto Condensed",
            },
            "h2": {
                "fontSize": "2rem",
                "color": "#222222",
                "textTransform": "lowercase",
                "fontFamily": "Roboto Condensed",
            },
            "body1": {
                "fontSize": "14px",
                "color": "black",
                "fontFamily": "Roboto",
                "position": "relative",
                "textAlign": "justify",
            },
        },
    }

    test('Should display login button when not authenticated', async () => {

        const state = mockUseAuth();

        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(
                <div>
                    <MockLoggingProvider>
                        <MockDesignProvider isWebpSupported={true} screen='large' theme={theme}>
                            <MockAuthProvider isAuthenticated={false}>
                                <Login height='80px' color='white' bgcolor='black'/>
                            </MockAuthProvider>
                        </MockDesignProvider>
                    </MockLoggingProvider>
                </div>
            );
        })

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(100);

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();
        expect(state.setIsOpen).toHaveBeenCalledTimes(0)
        expect(state.signOut).toHaveBeenCalledTimes(0)
        expect(state.ui.start).toHaveBeenCalledTimes(0)
        expect(state.resetError).toHaveBeenCalledTimes(0)

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'options' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(state.setIsOpen).toHaveBeenLastCalledWith(true)
        expect(state.setIsOpen).toHaveBeenCalledTimes(1)
        expect(state.signOut).toHaveBeenCalledTimes(0)
        expect(state.ui.start).toHaveBeenCalledTimes(0)
        //expect(state.resetError).toHaveBeenCalledTimes(1)

    })

    test('Should display user button when authenticated', async () => {

        const state = mockUseAuth();

        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(
                <div>
                    <MockLoggingProvider>
                        <MockDesignProvider isWebpSupported={true} screen='large' theme={theme}>
                            <MockAuthProvider isAuthenticated={true}>
                                <Login height='80px' color='white' bgcolor='black'/>
                            </MockAuthProvider>
                        </MockDesignProvider>
                    </MockLoggingProvider>
                </div>
            );
        })

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(100);

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();
        expect(state.setIsOpen).toHaveBeenCalledTimes(0)
        expect(state.signOut).toHaveBeenCalledTimes(0)
        expect(state.ui.start).toHaveBeenCalledTimes(0)
        expect(state.resetError).toHaveBeenCalledTimes(0)

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'options' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(state.setIsOpen).toHaveBeenLastCalledWith(true)
        expect(state.setIsOpen).toHaveBeenCalledTimes(1)
        expect(state.signOut).toHaveBeenCalledTimes(0)
        expect(state.ui.start).toHaveBeenCalledTimes(0)
        //expect(state.resetError).toHaveBeenCalledTimes(1)

    })

    test('Should display login options when not authenticated', async () => {

        const state = mockUseAuth();

        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(
                <div>
                    <MockLoggingProvider>
                        <MockDesignProvider isWebpSupported={true} screen='large' theme={theme}>
                            <MockAuthProvider isAuthenticated={false} isOpen={true}>
                                <Login height='80px' color='white' bgcolor='black' current='toto'/>
                            </MockAuthProvider>
                        </MockDesignProvider>
                    </MockLoggingProvider>
                </div>
            );
        })

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(1000);

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();
        expect(state.setIsOpen).toHaveBeenCalledTimes(0)
        expect(state.signOut).toHaveBeenCalledTimes(0)
        expect(state.ui.start).toHaveBeenCalledTimes(1)
        expect(state.resetError).toHaveBeenCalledTimes(0)

    })

    test('Should display join options when registration is open', async () => {

        const state = mockUseAuth();

        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(
                <div>
                    <MockLoggingProvider>
                        <MockDesignProvider isWebpSupported={true} screen='large' theme={theme} >
                            <MockAuthProvider isAuthenticated={false}  isOpen={true} registration='https://google.com'>
                                <Login height='80px' color='white' bgcolor='black'/>
                            </MockAuthProvider>
                        </MockDesignProvider>
                    </MockLoggingProvider>
                </div>
            );
        })

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(100);

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();
        expect(state.setIsOpen).toHaveBeenCalledTimes(0)
        expect(state.signOut).toHaveBeenCalledTimes(0)
        expect(state.ui.start).toHaveBeenCalledTimes(0)
        expect(state.resetError).toHaveBeenCalledTimes(0)

        await act(async () => {fireEvent.click(screen.getByRole('link', { name: 'registration' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree1 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree1).toMatchSnapshot();
        expect(state.setIsOpen).toHaveBeenLastCalledWith(false)
        expect(state.setIsOpen).toHaveBeenCalledTimes(1)
        expect(state.signOut).toHaveBeenCalledTimes(0)
        expect(state.ui.start).toHaveBeenCalledTimes(0)
        //expect(state.resetError).toHaveBeenCalledTimes(1)

    })

    test('Should enable logout when user is authenticated', async () => {

        const state = mockUseAuth();

        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(
                <div>
                    <MockLoggingProvider>
                        <MockDesignProvider isWebpSupported={true} screen='large' theme={theme} registration='https://google.com'>
                            <MockAuthProvider isAuthenticated={true}  isOpen={true}>
                                <Login height='80px' color='white' bgcolor='black'/>
                            </MockAuthProvider>
                        </MockDesignProvider>
                    </MockLoggingProvider>
                </div>
            );
        })

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(100);

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();
        expect(state.setIsOpen).toHaveBeenCalledTimes(0)
        expect(state.signOut).toHaveBeenCalledTimes(0)
        expect(state.ui.start).toHaveBeenCalledTimes(0)
        expect(state.resetError).toHaveBeenCalledTimes(0)

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'logout' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        const tree1 = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree1).toMatchSnapshot();
        expect(state.setIsOpen).toHaveBeenLastCalledWith(false)
        expect(state.setIsOpen).toHaveBeenCalledTimes(1)
        expect(state.signOut).toHaveBeenCalledTimes(1)
        expect(state.ui.start).toHaveBeenCalledTimes(0)
        expect(state.resetError).toHaveBeenCalledTimes(0)


    })

    test('Should display error when there is one', async () => {

        const state = mockUseAuth();

        let view = null
        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            view = render(
                <div>
                    <MockLoggingProvider>
                        <MockDesignProvider isWebpSupported={true} screen='large' theme={theme} registration='https://google.com'>
                            <MockAuthProvider isAuthenticated={true} isOpen={true} error="error" >
                                <Login height='80px' color='white' bgcolor='black'/>
                            </MockAuthProvider>
                        </MockDesignProvider>
                    </MockLoggingProvider>
                </div>
            );
        })

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(100);

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();
        expect(state.setIsOpen).toHaveBeenCalledTimes(0)
        expect(state.signOut).toHaveBeenCalledTimes(0)
        expect(state.ui.start).toHaveBeenCalledTimes(0)
        expect(state.resetError).toHaveBeenCalledTimes(0)


    })

})
