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

/* Material UI includes */
import { Button }                          from '@mui/material';

/* Test includes */
import { render, fireEvent, screen, act}   from '@testing-library/react'
import { expect, test}                     from '@jest/globals';

/* Component under test */
import { ErrorBoundary }                   from '../../containers';


/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
jest.mock('../../providers', () => ({ useLogging: (() => { return mockUseLogging(); }) }));
/* eslint-enable jest/no-mocks-import */
function MockErrorComponent() {

    return(
        <Button aria-label='mock-error' onClick={UndefinedFunction} />/* eslint-disable-line no-undef */
    )

};


describe("ErrorBoundary container" ,() => {

    test('Should be a ReactErrorBoundary in development', async () => {

        process.env.NODE_ENV = 'development'

        const { logText } = mockUseLogging()

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <div>
                    <MockLoggingProvider>
                        <ErrorBoundary>
                            <MockErrorComponent/>
                        </ErrorBoundary>
                    </MockLoggingProvider>
                </div>

            );

        })

        expect(logText).toHaveBeenLastCalledWith('ErrorBoundary', 'error', 'runtime', ' ReferenceError: UndefinedFunction is not defined')

        const message = screen.getByTestId('fallback-message')
        const error = screen.getByTestId('fallback-error')
        const stack = screen.getByTestId('fallback-stack-1')
        expect(message.textContent).toBe(' SOMETHING WENT WRONG ')
        expect(error.textContent).toBe(' UndefinedFunction is not defined ')
        expect(stack.textContent).toContain(' --- at MockErrorComponent ')
        expect(stack.textContent).toContain('/src/containers/__tests__/ErrorBoundaryTest.js:32:50) ')

        const summary = screen.getByTestId('fallback-accordion');
        expect(summary.getAttribute('aria-expanded')).toBe('false')
        await act(async () => {fireEvent.click(summary)}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(summary.getAttribute('aria-expanded')).toBe('true');

    })

    test('Should be a SentryErrorBoundary in production', async () => {

        process.env.NODE_ENV = 'production'

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <div>
                    <MockLoggingProvider>
                        <ErrorBoundary>
                            <MockErrorComponent/>
                        </ErrorBoundary>
                    </MockLoggingProvider>
                </div>

            );

        })

        const message = screen.getByTestId('fallback-message')
        const error = screen.getByTestId('fallback-error')
        expect(message.textContent).toBe(' SOMETHING WENT WRONG ')
        expect(error.textContent).toBe('  ')
        expect(screen.queryByTestId('fallback-stack-0')).toBeNull()

        const summary = screen.getByTestId('fallback-accordion');
        expect(summary.getAttribute('aria-expanded')).toBe('false')
        await act(async () => {fireEvent.click(summary)}) // eslint-disable-line testing-library/no-unnecessary-act
        expect(summary.getAttribute('aria-expanded')).toBe('true');

    })

})
