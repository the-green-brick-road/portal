/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Design Provider test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @15 may 2023
# Latest revision: 15 may 2023
# ---------------------------------------------------- */

/* React includes */
import { StrictMode }                       from 'react';

/* Material UI includes */
import { Button, Container, Typography }    from '@mui/material';

/* Test includes */
import { render, fireEvent, screen, act}    from '@testing-library/react'
import { expect, test}                      from '@jest/globals';

/* Component under test */
import { useDesign, DesignProvider }        from '../../providers/design';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../../providers/__mocks__/LoggingProvider';
import { useConfiguration as mockUseConfiguration, ConfigurationProvider as MockConfigurationProvider} from '../../providers/__mocks__/ConfigurationProvider';
import { useUseMediaQuery }                                                     from '../design/MaterialHook';
jest.mock('../design/MaterialHook');
jest.mock('../../providers', () => ({
    useLogging: (() => { return mockUseLogging(); }),
    useConfiguration: (() => { return mockUseConfiguration(); }),
}));
/* eslint-enable jest/no-mocks-import */

function MockDesignConsumer(props) {

    const { isSliding, isWebpSupported, screen, sizes, images, isDarkMode, setIsSliding } = useDesign();
    const { size, isDark } = props;

    var calls = JSON.parse(localStorage.getItem('mock-design-consumer'));
    if (calls === null) { calls = 0; }

    if (calls % 2 === 0) { expect(isSliding).toBe(false) }
    else                 { expect(isSliding).toBe(true)  }

    expect(screen).toBe(size)
    if(calls > 0) {

        expect(isWebpSupported).toBe(false)
        expect(isDarkMode).toBe(isDark)

        expect(sizes['small-width']).toBe(200)
        expect(sizes['medium-width']).toBe(400)
        expect(sizes['large-width']).toBe(800)
        expect(sizes['menu-height']).toBe(80)
        expect(sizes['margin']).toBe(10)
        expect(sizes['hamburger-height']).toBe(40)

        expect(images['test']['png']['small']['width']).toBe('200w')
        expect(images['test']['png']['medium']['width']).toBe('400w')
        expect(images['test']['png']['large']['width']).toBe('800w')
        expect(images['test']['webp']['small']['width']).toBe('200w')
        expect(images['test']['webp']['medium']['width']).toBe('400w')
        expect(images['test']['webp']['large']['width']).toBe('800w')

    }

    const handleClick = () => {

        if (isSliding)   { setIsSliding(false) }
        else             { setIsSliding(true)  }

        calls = calls + 1;
        localStorage.setItem('mock-design-consumer', JSON.stringify(calls))

    }

    return(
        <Container>
            <Button aria-label='mock-design-consumer' onClick={handleClick} />
            <Typography data-testid='mock-design-consumer-h1' variant="h1">h1</Typography>
            <Typography data-testid='mock-design-consumer-h2' variant="h2">h2</Typography>
            <Typography data-testid='mock-design-consumer-body1' variant="body1">body1</Typography>
        </Container>
    )

};

describe("Design provider" ,() => {

    const Config = {
        "design": {
            "images" :  [
                {
                    "name" : "test",
                    "raw"  : "mission.png",
                    "web"  : "mission.webp",
                }
            ],
            "sizes" : {
                "small-width"          : 200,
                "medium-width"         : 400,
                "large-width"          : 800,
                "menu-height"          : 80,
                "margin"               : 10,
                "hamburger-height"     : 40,
            },
            "theme" : {
                "light" : {
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
                },
                "dark" : {
                    "palette": {
                        "common": {
                            "black": "#999999",
                            "white": "#888888",
                        },
                        "primary": {
                            "main": "#777777",
                            "light": "#777776",
                            "dark": "#777775",
                        },
                        "secondary" : {
                            "main": "#666666",
                            "light": "#666665",
                            "dark": "#666664",
                        },
                        "disabled" : {
                            "main": "#555555",
                            "light": "#555554",
                            "dark": "#555553",
                        },
                        "text" : {
                            "primary": "#444444",
                            "secondary": "#333333",
                            "disabled": "#222222",
                        },
                    },
                    "direction": "ltr",
                    "typography": {
                        "h1": {
                            "fontSize": "11.5rem",
                            "color": "#222222",
                            "textTransform": "lowercase",
                            "fontFamily": "Roboto Condensed",
                        },
                        "h2": {
                            "fontSize": "11rem",
                            "color": "#333333",
                            "textTransform": "uppercase",
                            "fontFamily": "Roboto Condensed",
                        },
                        "body1": {
                            "fontSize": "12px",
                            "color": "white",
                            "fontFamily": "Roboto",
                            "position": "relative",
                            "textAlign": "justify",
                        },
                    },
                },
            },
        },

    }

    test('Should set design in dark mode and desktop mode', async () => {


        const mockUseUseMediaQuery= jest.fn(() => { return true });
        useUseMediaQuery.mockReturnValue(mockUseUseMediaQuery);

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <DesignProvider >
                                <MockDesignConsumer size='large' isDark={true}/>
                            </DesignProvider>
                        </MockLoggingProvider>
                    </MockConfigurationProvider>
                </StrictMode>

            );

        })

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-design-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-design-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act

        const h1 = getComputedStyle(screen.getByTestId('mock-design-consumer-h1'))
        const h2 = getComputedStyle(screen.getByTestId('mock-design-consumer-h2'))
        const body1 = getComputedStyle(screen.getByTestId('mock-design-consumer-body1'))

        expect(h1['font-size']).toBe('11.5rem')
        expect(h1['color']).toBe('rgb(34, 34, 34)')
        expect(h1['text-transform']).toBe('lowercase')
        expect(h1['font-family']).toBe('Roboto Condensed')
        expect(h2['font-size']).toBe('11rem')
        expect(h2['color']).toBe('rgb(51, 51, 51)')
        expect(h2['text-transform']).toBe('uppercase')
        expect(h2['font-family']).toBe('Roboto Condensed')
        expect(body1['font-size']).toBe('12px')
        expect(body1['color']).toBe('white')
        expect(body1['font-family']).toBe('Roboto')
        expect(body1['position']).toBe('relative')
        expect(body1['text-align']).toBe('justify')

    })

    test('Should set design in light mode and non desktop mode', async () => {

        const mockUseUseMediaQuery= jest.fn(() => { return false });
        useUseMediaQuery.mockReturnValue(mockUseUseMediaQuery);

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>

                    <MockConfigurationProvider config={Config}>
                        <MockLoggingProvider>
                            <DesignProvider >
                                <MockDesignConsumer size='small' isDark={false}/>
                            </DesignProvider>
                        </MockLoggingProvider>
                    </MockConfigurationProvider>
                </StrictMode>

            );

        })

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-design-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await delay(1000);

        await act(async () => {fireEvent.click(screen.getByRole('button', { name: 'mock-design-consumer' }))}) // eslint-disable-line testing-library/no-unnecessary-act
        await delay(1000);

        const h1 = getComputedStyle(screen.getByTestId('mock-design-consumer-h1'))
        const h2 = getComputedStyle(screen.getByTestId('mock-design-consumer-h2'))
        const body1 = getComputedStyle(screen.getByTestId('mock-design-consumer-body1'))

        expect(h1['font-size']).toBe('2.5rem')
        expect(h1['color']).toBe('rgb(17, 17, 17)')
        expect(h1['text-transform']).toBe('uppercase')
        expect(h1['font-family']).toBe('Roboto Condensed')
        expect(h2['font-size']).toBe('2rem')
        expect(h2['color']).toBe('rgb(34, 34, 34)')
        expect(h2['text-transform']).toBe('lowercase')
        expect(h2['font-family']).toBe('Roboto Condensed')
        expect(body1['font-size']).toBe('14px')
        expect(body1['color']).toBe('black')
        expect(body1['font-family']).toBe('Roboto')
        expect(body1['position']).toBe('relative')
        expect(body1['text-align']).toBe('justify')

    })

})
