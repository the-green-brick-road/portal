/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Configuration Provider test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @15 may 2023
# Latest revision: 15 may 2023
# ---------------------------------------------------- */

/* React includes */
import { StrictMode }                                 from 'react';

/* Material UI includes */
import { Container }                                  from '@mui/material';

/* Test includes */
import { render, act}                                 from '@testing-library/react'
import { expect, test}                                from '@jest/globals';

/* Component under test */
import { useConfiguration, ConfigurationProvider }    from '../../providers/configuration';

function MockConfigurationConsumer() {

    const { config } = useConfiguration();

    expect(config.something.someotherthing).toBe(4.5)

    return(
        <Container/>
    )

};

describe("Configuration provider" ,() => {

    test('Should set configuration', async () => {

        const Config = { "something"   : { "someotherthing"    : 4.5 } }

        await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act

            render(

                <StrictMode>
                    <ConfigurationProvider config={Config}>
                        <MockConfigurationConsumer/>
                    </ConfigurationProvider>
                </StrictMode>

            );

        })

    })


})
